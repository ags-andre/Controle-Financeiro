import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosLogin } from 'src/app/core/models/classes/DadosLogin.model';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponenteGenerico implements OnInit, IComponenteGenerico {

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    localStorage.clear();
    this.iniciarForm();
  }

  /* formulario */
  iniciarForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

  /* serviços */
  login(): void {
    this.authService.login(this.form.value as DadosLogin).subscribe(res => {
      localStorage.setItem('idUsuario', String(res.idUsuario));
      localStorage.setItem('token', res.tokenUsuarioLogado);
      //localStorage.setItem('nomeUsuario', res.);

      this.router.navigate(['gerenciamento/categoria/listagem']);
    });
  }
}
