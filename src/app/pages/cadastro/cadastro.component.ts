import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro();

    // Verifica se o formulário está válido
    if (formCadastro?.valid) {
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria;
      
      console.log(novoCadastro); // Para verificar o que está sendo enviado no console

      // Chama o serviço de cadastro e realiza o POST para o backend
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          console.log('Cadastro realizado com sucesso', value);
          this.router.navigate(['/login']); // Redireciona para a página de login após sucesso
        },
        error: (err) => {
          console.log('Erro ao realizar cadastro', err);
          // Você pode adicionar mais lógica para exibir uma mensagem de erro amigável para o usuário
        }
      });
    } else {
      console.log('Formulário inválido');
      // Adicione validações visuais para o usuário
    }
  }
}
