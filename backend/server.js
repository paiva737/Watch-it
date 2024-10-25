const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI || "sua-string-de-conexao";
const secret = process.env.JWT_SECRET || 'seu_segredo_jwt';

// Middleware
app.use(cors({
  origin: "http://localhost:4200", 
}));
app.use(bodyParser.json());
app.use(express.json());

// Conectar ao MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err.message);
  });

// Usa as rotas de autenticação
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes); 



// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
