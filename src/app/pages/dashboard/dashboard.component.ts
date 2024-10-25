import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/services/filmes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  filmesPopulares: any[] = [];
  filmesFiltrados: any[] = [];
  termoPesquisa: string = '';
  generoNomeSelecionado: string = 'Filmes Populares';
  page = 1;
  generoSelecionado: number | null = null; // Para rastrear o gênero selecionado
  
  generos = [
    { id: 28, nome: 'Ação' },
    { id: 12, nome: 'Aventura' },
    { id: 16, nome: 'Animação' },
    { id: 35, nome: 'Comédia' },
    { id: 80, nome: 'Crime' },
    { id: 99, nome: 'Documentário' },
    { id: 18, nome: 'Drama' },
    { id: 10751, nome: 'Família' },
    { id: 14, nome: 'Fantasia' },
    { id: 36, nome: 'História' },
    { id: 27, nome: 'Terror' },
    { id: 10402, nome: 'Música' },
    { id: 9648, nome: 'Mistério' },
    { id: 10749, nome: 'Romance' },
    { id: 878, nome: 'Ficção Científica' },
    { id: 10770, nome: 'Filme de TV' },
    { id: 53, nome: 'Thriller' },
    { id: 10752, nome: 'Guerra' },
    { id: 37, nome: 'Faroeste' }
  ];

  constructor(private filmesService: FilmesService) { }

  ngOnInit(){
    this.carregarFilmesPopulares(); // Carrega os filmes populares inicialmente
  }

  carregarFilmesPopulares() {
    this.filmesService.getFilmesPopulares(this.page).subscribe({
      next: (filmes) => {
        this.filmesPopulares = filmes;
        this.filmesFiltrados = filmes;
      },
      error: (err) => {
        console.error('Erro ao carregar filmes populares:', err);
      }
    });
  }

  filtrarPorGenero(idGenero: number) {
    this.page = 1; // Reseta a página ao filtrar por gênero
    this.generoSelecionado = idGenero;
    this.filmesService.getFilmesPorGenero(idGenero, this.page).subscribe({
      next: (filmes) => {
        this.filmesFiltrados = filmes;
        const generoSelecionado = this.generos.find(genero => genero.id === idGenero);
        this.generoNomeSelecionado = `Filmes de ${generoSelecionado?.nome}`;
      },
      error: (err) => {
        console.error('Erro ao filtrar filmes por gênero:', err);
      }
    });
  }

  carregarMaisFilmes() {
    this.page++; // Incrementa a página
    if (this.generoSelecionado) {
      // Carrega mais filmes filtrados pelo gênero
      this.filmesService.getFilmesPorGenero(this.generoSelecionado, this.page).subscribe({
        next: (filmes) => {
          this.filmesFiltrados = [...this.filmesFiltrados, ...filmes]; // Adiciona mais filmes à lista existente
        },
        error: (err) => {
          console.error('Erro ao carregar mais filmes por gênero:', err);
        }
      });
    } else {
      // Carrega mais filmes populares
      this.filmesService.getFilmesPopulares(this.page).subscribe({
        next: (filmes) => {
          this.filmesFiltrados = [...this.filmesFiltrados, ...filmes]; // Adiciona mais filmes à lista existente
        },
        error: (err) => {
          console.error('Erro ao carregar mais filmes populares:', err);
        }
      });
    }
  }

  pesquisarFilmes() {
    if (this.termoPesquisa) {
      this.filmesFiltrados = this.filmesPopulares.filter(filme =>
        filme.title.toLowerCase().includes(this.termoPesquisa.toLowerCase())
      );
    } else {
      this.filmesFiltrados = this.filmesPopulares;
    }
  }
}
