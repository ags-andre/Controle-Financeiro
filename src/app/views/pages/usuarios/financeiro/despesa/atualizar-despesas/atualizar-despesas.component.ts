import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cartao } from 'src/app/core/models/classes/cartao/Cartao.model';
import { Despesa, Mes } from 'src/app/core/models/classes/cartao/Despesa.model';
import { Categoria } from 'src/app/core/models/classes/categoria/Categoria.model';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { CartaoService } from 'src/app/core/services/usuario/cartao.service';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { DespesasService } from 'src/app/core/services/usuario/despesas.service';
import { MesService } from 'src/app/core/services/gerenciamento/mes.service';
import { FormValidations } from 'src/app/views/shared/validations/form-validations';
import { GanhoDespesa } from 'src/app/core/models/genericos/GanhoDespesa.model';

@Component({
  selector: 'app-atualizar-despesas',
  templateUrl: './atualizar-despesas.component.html',
  styleUrls: ['./atualizar-despesas.component.css']
})
export class AtualizarDespesasComponent extends GanhoDespesa implements OnInit, AfterViewInit, OnDestroy, IComponenteGenerico {

  cartoes: Cartao[]= new Array();
  idDespesa!: number;

  constructor(protected override router: Router,
     private route: ActivatedRoute,
     protected override fb: FormBuilder,
     private despesasService: DespesasService,
     protected override mesService: MesService,
     private cartoesService: CartaoService,
     protected override categoriaService: CategoriasService) {
    super(router, categoriaService, mesService, fb);
  }

  ngOnInit(): void {
    this.idDespesa = Number(window.atob(this.route.snapshot.params['id']));
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.iniciarForm();
    this.getDespesasPeloId();
    this.getCartoesPeloUsuarioId();
    this.getCategoriasDespesas();
    this.getMeses();
  }

  ngAfterViewInit(): void {
    this.habilitarCampoDia();
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(x => x.unsubscribe());
  }

  iniciarForm(): void {
    this.form = this.fb.group({
      id: [this.idDespesa],
      cartaoId: [null, Validators.required],
      descricao: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      categoriaId: [null, Validators.required],
      valor: [null, Validators.required],
      dia: [null, [Validators.required, Validators.minLength(2) , Validators.maxLength(2)]],
      mesId: [null, Validators.required],
      ano: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4), FormValidations.rangeAno]],
      usuarioId: [this.usuarioId, Validators.required]
    });
  }


  /* Serviços */
  getDespesasPeloId() {
    this.inscricoes.push(
      this.despesasService.getDespesaPeloID(this.idDespesa).subscribe(res => {
        this.form.patchValue(res);
      })
    );
  }

  getCartoesPeloUsuarioId(): void {
    this.inscricoes.push(
      this.cartoesService.getCartoesByIdUsuario(this.usuarioId).subscribe(res => {
        this.cartoes = res;
      })
    )
  }

  putDespesa(form: FormGroup): void {
    this.inscricoes.push(
      this.despesasService.putDespesa(this.idDespesa, form.value as Despesa).subscribe({
        next: () => {
          this.router.navigate(['/usuarios/financeiro/despesas/listagem']);
        }
      })
    );
  }
}
