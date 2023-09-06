import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cartao } from 'src/app/core/models/classes/cartao/Cartao.model';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { CartaoService } from 'src/app/core/services/usuario/cartao.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';

@Component({
  selector: 'app-atualizar-cartao',
  templateUrl: './atualizar-cartao.component.html',
  styleUrls: ['./atualizar-cartao.component.css']
})
export class AtualizarCartaoComponent extends ComponenteGenerico implements OnInit, IComponenteGenerico {

  idCartao!: number;
  usuarioId!: string;
  inscricoes: Subscription[] = new Array();

  constructor(private fb: FormBuilder, private cartaoService: CartaoService, private router: Router, private route: ActivatedRoute, private mensageria: MensageriaService) {
    super();
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.idCartao = Number(window.atob(this.route.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.getCartaoById();
  }

  /* Formulário */
  iniciarForm(): void {
    this.form = this.fb.group({
      id: this.idCartao,
      nome: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      bandeira: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      numero: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(23)]],
      limite: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      usuarioId: [this.usuarioId]
    });
  }

  /* Serviços */
  getCartaoById(): void {
    this.inscricoes.push(this.cartaoService.getById(this.idCartao).subscribe(res => {
      this.form.patchValue(res);
    }));
  }

  putCartao(form: FormGroup): void {
    this.inscricoes.push(this.cartaoService.putCartao(this.idCartao, form.value as Cartao).subscribe(res => {
      this.mensageria.openSnackBar(res.mensagem);
      this.router.navigate(['/usuarios/cartoes/listagem']);
    }));
  }
}
