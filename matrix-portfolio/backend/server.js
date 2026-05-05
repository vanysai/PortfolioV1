const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log("Novo contato:", name, email, message);

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});