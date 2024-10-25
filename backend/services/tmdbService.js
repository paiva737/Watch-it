const axios = require('axios');

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmJiZmYwNmUwNDgwOTkwNGY0NTFjYmRiZjkwODRlOCIsIm5iZiI6MTcyOTgwNTA4NC40NjU0OTIsInN1YiI6IjY3MWFiYTNjMzRjMGZhYmQ2ODFjNjZkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_FW5r7ZCZ6z5xs3yQsRTX9GE9y2-jtzCmveLlGs_Js';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = {
  buscarFilmesPopulares: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular?language=pt-BR`, {
        headers: {
          Authorization: TOKEN,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw error;
    }
  },

  buscarGeneros: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list?language=pt-BR`, {
        headers: {
          Authorization: TOKEN,
        },
      });
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw error;
    }
  },

  buscarFilmesPorGenero: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie?with_genres=${id}&language=pt-BR`, {
        headers: {
          Authorization: TOKEN,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(`Erro ao buscar filmes pelo gênero com ID ${id}:`, error);
      throw error;
    }
  },
};

module.exports = tmdbService;
