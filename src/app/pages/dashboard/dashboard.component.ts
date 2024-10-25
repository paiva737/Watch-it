import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/services/filmes.service';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  filmesPopulares: any[] = [];
  filmesFiltrados: any[] = [];
  favoritos: { [id: string]: boolean } = {};
  generos: any[] = [];
  termoPesquisa = '';
  generoNomeSelecionado = 'Filmes Populares';
  fasHeart = fasHeart;
  farHeart = farHeart;
  paginaAtual = 1;

  constructor(private filmesService: FilmesService) {}

  ngOnInit() {
    this.carregarFilmesPopulares();
    this.carregarGeneros();
  }

  carregarFilmesPopulares() {
    this.filmesService.getFilmesPopulares(this.paginaAtual).subscribe({
      next: (filmes) => {
        this.filmesPopulares = filmes;
        this.filmesFiltrados = filmes;
        this.generoNomeSelecionado = 'Filmes Populares';
      },
      error: (err) => console.error('Erro ao carregar filmes populares:', err)
    });
  }

  carregarGeneros() {
    this.filmesService.getGeneros().subscribe({
      next: (generos) => {
        this.generos = generos;
      },
      error: (err) => console.error('Erro ao carregar gêneros:', err)
    });
  }

  filtrarPorGenero(generoId: number, generoNome: string) {
    this.generoNomeSelecionado = `Filmes do gênero ${generoNome}`;
    this.filmesService.getFilmesPorGenero(generoId).subscribe({
      next: (filmes) => {
        this.filmesFiltrados = filmes;
      },
      error: (err) => console.error('Erro ao filtrar por gênero:', err)
    });
  }

  pesquisarFilmes() {
    this.filmesFiltrados = this.filmesPopulares.filter(filme =>
      filme.title.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }

  toggleFavorito(id: string) {
    this.favoritos[id] = !this.favoritos[id];
  }

  carregarMaisFilmes() {
    this.paginaAtual++;
    this.filmesService.getFilmesPopulares(this.paginaAtual).subscribe({
      next: (novosFilmes) => {
        this.filmesPopulares.push(...novosFilmes);
        this.filmesFiltrados.push(...novosFilmes);
      },
      error: (err) => console.error('Erro ao carregar mais filmes:', err)
    });
  }
  mostrarFavoritos() {
    this.generoNomeSelecionado = 'Filmes Favoritados';
    this.filmesFiltrados = this.filmesPopulares.filter(filme => this.favoritos[filme.id]);
  }
  
}
