import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

    private apiUrl = 'http://localhost:8080/movies'; 


  constructor(private http: HttpClient) { }

  // Método para buscar filmes populares
  getFilmesPopulares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/populares`); 
  }

  // Método para buscar detalhes de um filme pelo ID
  getFilmeDetalhes(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalhes/${id}`); 
  }
}
