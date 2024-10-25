import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private apiUrl = 'http://localhost:8080/movies'; // URL do backend

  constructor(private http: HttpClient) { }

  // Método para buscar filmes populares com paginação
  getFilmesPopulares(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/populares?page=${page}`);
  }

  // Método para buscar filmes por gênero com paginação
  getFilmesPorGenero(generoId: number, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/genero/${generoId}?page=${page}`);
  }
}
