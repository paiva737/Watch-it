import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';  // Importa o AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
  
      this.authService.login(email, senha).subscribe({
        next: (response) => {
          if (response.token) {
            console.log('Token JWT recebido:', response.token);
            // Armazenar o token no localStorage
            this.authService.setToken(response.token);
            // Redirecionar para outra página após o login
            this.router.navigate(['/perfil']);
            
          } else {
            console.error('Token JWT não recebido');
          }
        },
        error: (error) => {
          this.errorMessage = 'Falha no login, verifique as credenciais';
          console.error('Erro no login:', error);
        }
      });
      
    }
  
  }
  
  
}
