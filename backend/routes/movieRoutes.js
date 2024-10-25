const express = require('express');
const tmdbService = require('../services/tmdbService');
const router = express.Router();

// Rota para buscar filmes populares
router.get('/populares', async (req, res) => {
  try {
    const filmes = await tmdbService.buscarFilmesPopulares();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar filmes populares' });
  }
});

// Rota para buscar detalhes de um filme pelo ID
router.get('/movies/detalhes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const detalhes = await tmdbService.buscarDetalhesDoFilme(id);
    res.json(detalhes);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar detalhes do filme com ID ${id}` });
  }
});

module.exports = router;
