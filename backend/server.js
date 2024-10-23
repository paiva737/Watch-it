
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');  

const app = express();  
const port = 8080;
const secret = 'your-secret-key';  


app.use(cors());
app.use(bodyParser.json());


app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;

  
  const usuarioCadastrado = {
    email: 'rafaelpaiva434@gmail.com',
    senha: '123456'
  };

  
  if (email === usuarioCadastrado.email && senha === usuarioCadastrado.senha) {
   
    const token = jwt.sign({ email: usuarioCadastrado.email }, secret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } else {
    res.status(401).json({ message: 'Email ou senha incorretos' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
