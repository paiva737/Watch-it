const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define o esquema de usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  nascimento: {
    type: Date,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  }
});

// Hash da senha antes de salvar o usuário
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar senhas no login
userSchema.methods.comparePassword = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', userSchema);
