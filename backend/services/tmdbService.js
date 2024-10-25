const axios = require('axios');

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmJiZmYwNmUwNDgwOTkwNGY0NTFjYmRiZjkwODRlOCIsIm5iZiI6MTcyOTgwNTA4NC40NjU0OTIsInN1YiI6IjY3MWFiYTNjMzRjMGZhYmQ2ODFjNjZkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A_FW5r7ZCZ6z5xs3yQsRTX9GE9y2-jtzCmveLlGs_Js';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = {
  // Função para buscar filmes populares
  buscarFilmesPopulares: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          language: 'pt-BR', // Define o idioma para português
        },
      });
      return response.data.results; // Retorna a lista de filmes
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw error;
    }
  },

  // Função para buscar detalhes de um filme pelo ID
  buscarDetalhesDoFilme: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        headers: {
          Authorization: TOKEN,
        },
      });
      return response.data; // Retorna os detalhes do filme
    } catch (error) {
      console.error(`Erro ao buscar detalhes do filme com ID ${id}:`, error);
      throw error;
    }
  }
};

module.exports = tmdbService;
