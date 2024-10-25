import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false; // Para armazenar o estado de login
  user$ = this.userService.retornarUser();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Checa se o usuário está logado ao carregar o componente
    this.userService.retornarUser().subscribe(user => {
      this.isLoggedIn = !!user; // Define como verdadeiro se houver um usuário
    });
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false; // Atualiza o estado de login
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Recarrega a página após logout
    });
  }
}
