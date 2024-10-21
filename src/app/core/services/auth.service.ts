import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // Método para fazer o login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, senha });
  }


  // Armazenar o token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remover o token (logout)
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
