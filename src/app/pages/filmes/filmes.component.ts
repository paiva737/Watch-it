import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/services/filmes.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  filmesPopulares: any[] = []; // Armazena os filmes populares

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
}
