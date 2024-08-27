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
  host: 'localhost',
  user: 'root',
  password: '', // Substitua pela sua senha do MySQL
  database: 'chamados'   // Certifique-se de que o banco de dados 'chamado' existe
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

  const sql = `SELECT * FROM equipamento WHERE CAST(patrimonio AS CHAR) LIKE ?`;
  const values = [`${query}%`]; // Busca que começa com o valor digitado

  console.log('Consulta SQL:', sql, 'Valores:', values); // Log da consulta SQL

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao buscar equipamentos:', err);
      return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
    }

    console.log('Resultados da consulta:', results); // Log dos resultados da consulta
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
