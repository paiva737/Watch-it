const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const usuarios = [
  {
    email: 'rafaelpaiva434@gmail.com',
    senha: 'senha123',
    nome: 'Rafael Paiva'
  }
];

const secret = 'seu_segredo_jwt';

// Rota de login
app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o usuário existe
  const usuarioCadastrado = usuarios.find(user => user.email === email);

  if (!usuarioCadastrado) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Verificar se a senha está correta
  if (usuarioCadastrado.senha !== senha) {
    return res.status(403).json({ message: 'Senha incorreta' });
  }

  // Gerar o token JWT
  const token = jwt.sign({ email: usuarioCadastrado.email, nome: usuarioCadastrado.nome }, secret, { expiresIn: '1h' });
  res.json({ token });
});

// Rota de perfil para obter os dados do usuário
app.get('/auth/perfil', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token ausente' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }

    // Retornar os dados do usuário com base no token decodificado
    const usuario = usuarios.find(user => user.email === decoded.email);
    if (usuario) {
      return res.json(usuario);
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
