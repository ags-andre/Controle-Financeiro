import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cartao } from 'src/app/core/models/classes/cartao/Cartao.model';
import { Despesa } from 'src/app/core/models/classes/cartao/Despesa.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { CartaoService } from 'src/app/core/services/usuario/cartao.service';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { DespesasService } from 'src/app/core/services/usuario/despesas.service';
import { MesService } from 'src/app/core/services/gerenciamento/mes.service';
import { FormValidations } from 'src/app/views/shared/validations/form-validations';
import { GanhoDespesa } from 'src/app/core/models/genericos/GanhoDespesa.model';

@Component({
  selector: 'app-nova-despesa',
  templateUrl: './nova-despesa.component.html',
  styleUrls: ['./nova-despesa.component.css']
})
export class NovaDespesaComponent extends GanhoDespesa implements OnInit, AfterViewInit, OnDestroy, IComponenteGenerico {

  cartoes: Cartao[]= new Array();

  constructor(
      protected override router: Router,
      private cartoesService: CartaoService,
      protected override categoriaService: CategoriasService,
      protected override mesService: MesService,
      private despesasService: DespesasService,
      protected override fb: FormBuilder
    ) {
    super(router, categoriaService, mesService, fb);
  }

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.iniciarForm();
    this.getCartoesPeloUsuarioId();
    this.getCategoriasDespesas();
    this.getMeses();
  }

  ngAfterViewInit(): void {
    this.habilitarCampoDia();
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(e => e.unsubscribe());
  }

  iniciarForm(): void {
    this.form = this.fb.group({
      cartaoId: [null, Validators.required],
      descricao: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      categoriaId: [null, Validators.required],
      valor: [null, Validators.required],
      dia: [{value: null, disabled: true}, [Validators.required, Validators.minLength(2) , Validators.maxLength(2)]],
      mesId: [null, Validators.required],
      ano: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), FormValidations.rangeAno]],
      usuarioId: [this.usuarioId, Validators.required]
    });
  }

  /* Serviços */
  getCartoesPeloUsuarioId(): void {
    this.inscricoes.push(
      this.cartoesService.getCartoesByIdUsuario(this.usuarioId).subscribe(res => {
        this.cartoes = res;
      })
    )
  }

  postDespesa(form: FormGroup): void {
    this.inscricoes.push(
      this.despesasService.postDespesa(form.value as Despesa).subscribe({
        next: () => {
          //this.router.navigate(['/usuarios/financeiro/despesas/listagem']);
          window.history.go(-1);
        }
      })
    );
  }
}
