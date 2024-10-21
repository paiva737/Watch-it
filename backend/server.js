const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');  // Certifique-se de importar o jsonwebtoken

const app = express();  // Aqui estamos criando o app com express
const port = 8080;
const secret = 'your-secret-key';  // Defina sua chave secreta

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota de login
app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;

  // Simulação de um usuário cadastrado
  const usuarioCadastrado = {
    email: 'rafaelpaiva434@gmail.com',
    senha: '123456'
  };

  // Verificação das credenciais
  if (email === usuarioCadastrado.email && senha === usuarioCadastrado.senha) {
    // Gerar um token JWT real com validade de 1 hora
    const token = jwt.sign({ email: usuarioCadastrado.email }, secret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } else {
    res.status(401).json({ message: 'Email ou senha incorretos' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
