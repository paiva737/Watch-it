const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;
const secret = 'your-secret-key';

app.use(cors());
app.use(bodyParser.json());

// Middleware para verificar o token JWT
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: 'Token não fornecido' });
  }
}

// Rota protegida para buscar o perfil
app.get('/auth/perfil', verificarToken, (req, res) => {
  const usuario = {
    email: 'rafaelpaiva434@gmail.com',
    nome: 'Rafael Paiva',
    nascimento: '1990-01-01',
    cpf: '12345678900',
    cidade: 'São Paulo',
    estado: 'SP',
    telefone: '999999999',
    genero: 'Masculino'
  };

  res.status(200).json(usuario);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
