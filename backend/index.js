// backend/server.js

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: '10.189.87.21',
  user: 'consulta',
  password: 'Senai123', // Substitua pela sua senha do MySQL
  database: 'chamados'   // Certifique-se de que o banco de dados 'chamados' existe
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

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

    res.json(results); // Enviar os resultados como resposta JSON
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
