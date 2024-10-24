import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, senha });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Adiciona o token JWT no cabeçalho da requisição
  private adicionarToken() {
    const token = this.getToken();
    if (token) {
      return {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      };
    }
    return {};
  }

  buscarPerfil(): Observable<any> {
    // Aqui garantimos que o token será enviado
    return this.http.get(`${this.apiUrl}/auth/perfil`, this.adicionarToken());
  }
}
