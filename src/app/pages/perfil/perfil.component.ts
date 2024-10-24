import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo = 'Olá, ';
  nome: string = '';
  textoBotao = 'ATUALIZAR';  // Definindo o texto do botão
  perfilComponent = true;    // Definindo a variável para o componente de perfil

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.retornarUser().subscribe(usuario => {
      this.nome = usuario ? usuario.nome : '';
    });

    // Verificar se o token está presente no TokenService
    if (this.tokenService.retornarToken()) {
      // Aqui estamos apenas carregando o usuário, como exemplo
      const usuario = this.userService.retornarUser();
      usuario.subscribe(user => {
        this.nome = user ? user.nome : '';
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  atualizar() {
    // Função que pode ser implementada para atualizar o perfil
    console.log('Perfil atualizado');
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
