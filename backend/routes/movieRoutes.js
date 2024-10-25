const express = require('express');
const router = express.Router();
const tmdbService = require('../services/tmdbService');

router.get('/generos', async (req, res) => {
  try {
    const generos = await tmdbService.buscarGeneros();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar gêneros', error });
  }
});

router.get('/populares', async (req, res) => {
  try {
    const filmesPopulares = await tmdbService.buscarFilmesPopulares();
    res.json(filmesPopulares);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar filmes populares', error });
  }
});

router.get('/genero/:id', async (req, res) => {
  const generoId = req.params.id;
  try {
    const filmes = await tmdbService.buscarFilmesPorGenero(generoId);
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar filmes pelo gênero ${generoId}`, error });
  }
});

module.exports = router;
