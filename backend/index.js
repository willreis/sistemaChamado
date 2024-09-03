const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const session = require('express-session');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: '10.189.87.21',
  user: 'consulta',
  password: process.env.DB_PASSWORD || 'Senai123', // Substitua por variáveis de ambiente para segurança
  database: 'chamados' // Certifique-se de que o banco de dados 'chamados' existe
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'sJYMmuCB2Z187XneUuaOVYTVUlxEOb2K94tFZy370HjOY7T7aiCKvwhNQpQBYL9e', // Use variáveis de ambiente
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Configurações LDAP
const ldapOptions = {
  server: {
    url: 'ldap://10.189.87.7:389', // IP do servidor AD
    bindDN: 'cn=script,ou=Funcionarios,ou=Usuarios123,dc=educ123,dc=sp,dc=senai,dc=br', // DN para bind
    bindCredentials: process.env.LDAP_PASSWORD || '7GFGOy4ATCiqW9c86eStgCe0RA9BgA', // Use variáveis de ambiente para senhas
    searchBase: 'ou=Funcionarios,ou=Usuarios123,dc=educ123,dc=sp,dc=senai,dc=br', // Base de busca
    searchFilter: '(sAMAccountName={{username}})', // Filtro de busca de usuário
    groupSearchBase: 'ou=Funcionarios,ou=Usuarios123,dc=educ123,dc=sp,dc=senai,dc=br', // Base de busca de grupos
    groupSearchFilter: '(&(cn=Professores)(member={{dn}}))' // Filtro de grupo específico
  }
};

passport.use(new LdapStrategy(ldapOptions));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Rota de Login
app.post('/api/login', passport.authenticate('ldapauth', { session: true }), (req, res) => {
  res.send({ message: 'Autenticado com sucesso', user: req.user });
});

// Rota de Logout
app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao realizar logout' });
    }
    res.send({ message: 'Logout realizado com sucesso' });
  });
});

// Middleware para verificar se o usuário está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Você precisa estar autenticado para acessar esta rota');
};

// Middleware para verificar grupos de usuários
const checkGroup = (groupsAllowed) => (req, res, next) => {
  const userGroups = req.user._groups || [];
  const hasAccess = groupsAllowed.some(group => userGroups.includes(group));

  if (hasAccess) {
    return next();
  }
  res.status(403).send('Acesso negado');
};

// Exemplo de rota protegida por autenticação e grupo
app.get('/api/protected', isAuthenticated, checkGroup(['CN=Professores,OU=Grupos,DC=sp,DC=senai,DC=br', 'CN=Grupos,OU=Grupos,DC=sp,DC=senai,DC=br']), (req, res) => {
  res.send('Você tem acesso a esta rota!');
});

// Rotas para funções específicas

// Rota para filtrar patrimônios
app.get('/api/equipamentos/filtrar', (req, res) => {
  const { query } = req.query;

  if (!query || query.length < 4) {
    return res.status(400).json({ error: 'Query deve ter pelo menos 4 caracteres' });
  }

  const sql = `SELECT * FROM equipamentos WHERE CAST(patrimonio AS CHAR) LIKE ?`;
  const values = [`${query}%`];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao buscar equipamentos:', err);
      return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
    }

    res.json(results);
  });
});

// Rota para inserir Chamados
app.post('/api/chamados/inserir', (req, res) => {
  const { patrimonio, prioridade, descricao, usuario } = req.body;

  const sql = `
    INSERT INTO chamados (patrimonio_id, prioridade, descri, user_abr) 
    VALUES (?, ?, ?, ?)
  `;
  
  const values = [patrimonio, prioridade, descricao, usuario];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao inserir chamado:', err);
      return res.status(500).json({ error: 'Erro ao inserir chamado' });
    }
    res.status(200).json({ message: 'Chamado inserido com sucesso', id: results.insertId });
  });
});

// Rota para obter todos os chamados
app.get('/api/chamados', (req, res) => {
  const sql = `SELECT * FROM chamados`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar todos os chamados:', err);
      return res.status(500).json({ error: 'Erro ao buscar todos os chamados' });
    }

    res.json(results);
  });
});

// Endpoint para buscar FAQs
app.get('/api/faqs', (req, res) => {
  const sql = 'SELECT * FROM faqs';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar FAQs:', err);
      res.status(500).json({ error: 'Erro ao buscar FAQs' });
      return;
    }
    res.json(results);
  });
});

// Rota para cadastrar uma nova FAQ
app.post('/api/faqs/cadastrar', (req, res) => {
  const { titulo, texto } = req.body;

  const sql = `
    INSERT INTO faqs (titulo, texto) 
    VALUES (?, ?)
  `;
  
  const values = [titulo, texto];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar FAQ:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar FAQ' });
    }
    res.status(200).json({ message: 'FAQ cadastrada com sucesso', id: results.insertId });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
