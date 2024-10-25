import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  private apiUrl = 'http://localhost:8080/movies';

  constructor(private http: HttpClient) {}

  getFilmesPopulares(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/populares?page=${page}`);
  }

  getFilmesPorGenero(generoId: number, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/genero/${generoId}?page=${page}`);
  }

  getGeneros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/generos`);
  }
}
