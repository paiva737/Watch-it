const jwt = require('jsonwebtoken');

// O token JWT que você deseja decodificar
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmFlbHBhaXZhNDM0QGdtYWlsLmNvbSIsImlhdCI6MTcyOTcyMTM2NywiZXhwIjoxNzI5NzI0OTY3fQ.0OkY9qkxuc2kOu5asUdIP-sJz28TiDRQWqHv9UplRHY';

// Decodificar o token JWT sem verificar a assinatura
const decoded = jwt.decode(token);

console.log('Token decodificado:', decoded);
