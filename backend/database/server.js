const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });


// Configurar a porta do servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
