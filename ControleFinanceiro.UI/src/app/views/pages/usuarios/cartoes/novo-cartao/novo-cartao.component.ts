import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cartao } from 'src/app/core/models/classes/cartao/Cartao.model';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { CartaoService } from 'src/app/core/services/usuario/cartao.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';

@Component({
  selector: 'app-cartoes',
  templateUrl: './novo-cartao.component.html',
  styleUrls: ['./novo-cartao.component.css']
})
export class NovoCartaoComponent extends ComponenteGenerico implements OnInit, IComponenteGenerico {

  usuarioId!: string;

  constructor(private cartaoService: CartaoService, private mensageria: MensageriaService, private fb: FormBuilder, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.iniciarForm();
  }

  iniciarForm(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      bandeira: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      numero: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      limite: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(29)]],
      usuarioId: [this.usuarioId]
    });
  }

  postCartao(form: FormGroup): void {
    this.cartaoService.postCartao(form.value as Cartao).subscribe(res => {
      this.mensageria.openSnackBar(res.mensagem);
      this.router.navigate(['/usuarios/cartoes/listagem']);
    })
  }

  voltarListagem(): void {
    window.history.go(-1);
  }
}
