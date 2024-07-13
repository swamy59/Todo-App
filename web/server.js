const express = require('express');
require('dotenv').config();
console.log(process.env.DB_USER, "hi");
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public'));
const dbConfig = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
};
app.get('/tasks', async (req, res) => {
   const connection = await mysql.createConnection(dbConfig);
   const [tasks] = await connection.execute('SELECT * FROM tasks');
   await connection.end();
   res.json(tasks);
});
app.post('/tasks', async (req, res) => {
   const { description } = req.body;
   const connection = await mysql.createConnection(dbConfig);
   await connection.execute('INSERT INTO tasks (description) VALUES (?)', [description]);
   await connection.end();
   res.status(201).end();
});
app.delete('/tasks/:id', async (req, res) => {
   const { id } = req.params;
   const connection = await mysql.createConnection(dbConfig);
   await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
   await connection.end();
   res.status(204).end();
});
app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
