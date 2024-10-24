const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const router = express.Router();
const secret = process.env.JWT_SECRET || "seu-segredo-jwt";

// Cadastro de usuário
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha, nascimento, cpf, cidade, telefone, genero } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso." });
    }

    const newUser = new User({ nome, email, senha, nascimento, cpf, cidade, telefone, genero });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, nome: newUser.nome },
      secret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token });
  } catch (error) {
    console.error("Erro no cadastro do usuário", error);
    res.status(500).json({ message: "Erro no cadastro do usuário", error });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ userId: user._id, nome: user.nome }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro no login", error);
    res.status(500).json({ message: "Erro no login", error });
  }
});

module.exports = router;
