import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verifica se o token existe
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken();
      // Verifica se o token não está vazio ou undefined
      if (token) {
        // Clona a requisição e adiciona o token ao cabeçalho de autorização
        request = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    }
    // Sempre retorna a requisição para continuar o fluxo
    return next.handle(request);
  }
}
