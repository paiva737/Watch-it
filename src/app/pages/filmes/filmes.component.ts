import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/services/filmes.service';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  filmesPopulares: any[] = [];
  AiFillHeart = AiFillHeart;
  AiOutlineHeart = AiOutlineHeart;
  favoritos: { [id: string]: boolean } = {}; // Estado para rastrear filmes favoritos

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.carregarFilmesPopulares();
  }

  carregarFilmesPopulares() {
    this.filmesService.getFilmesPopulares().subscribe({
      next: (filmes) => {
        this.filmesPopulares = filmes;
      },
      error: (err) => {
        console.error('Erro ao carregar filmes populares', err);
      }
    });
  }

  toggleFavorito(filme: any) {
    const filmeId = filme.id;
    this.favoritos[filmeId] = !this.favoritos[filmeId];
    
    if (this.favoritos[filmeId]) {
      console.log(`Filme ${filme.title} adicionado aos favoritos`);
      // Adicione aqui a lógica para salvar o favorito no backend, se necessário
    } else {
      console.log(`Filme ${filme.title} removido dos favoritos`);
      // Adicione aqui a lógica para remover o favorito do backend, se necessário
    }
  }
}
