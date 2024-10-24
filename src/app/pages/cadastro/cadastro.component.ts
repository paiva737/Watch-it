import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  nomeUsuario: string = '';
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

    this.userService.retornarUser().subscribe(user => {
      if (user && user.nome) {
        this.nomeUsuario = user.nome;
      } else {
        console.log('Nome do usuário não encontrado.');
      }
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const novoCadastro = this.cadastroForm.getRawValue() as PessoaUsuaria;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          console.log('Cadastro realizado com sucesso', value);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Erro ao realizar cadastro', err);
        }
      });
    }
  }
}
