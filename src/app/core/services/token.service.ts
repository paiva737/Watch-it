import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // Retorna o token armazenado no localStorage
  retornarToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Verifica se há um token armazenado
  possuiToken(): boolean {
    return !!this.retornarToken();
  }

  // Decodifica o token JWT
  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  // Armazena o token no localStorage
  salvarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Remove o token do localStorage
  excluirToken(): void {
    localStorage.removeItem('token');
  }
}
