import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/services/filmes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  filmesPopulares: any[] = []; // Variável para armazenar os filmes populares

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.carregarFilmesPopulares(); // Chama a função quando o componente for carregado
  }

  carregarFilmesPopulares() {
    this.filmesService.getFilmesPopulares().subscribe({
      next: (filmes) => {
        this.filmesPopulares = filmes;
        console.log('Filmes populares carregados:', filmes);
      },
      error: (err) => {
        console.error('Erro ao carregar filmes populares:', err);
      }
    });
  }
}
