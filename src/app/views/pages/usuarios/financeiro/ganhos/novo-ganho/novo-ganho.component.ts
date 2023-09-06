import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ganho } from 'src/app/core/models/classes/cartao/Ganho.model';
import { GanhoDespesa } from 'src/app/core/models/genericos/GanhoDespesa.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { MesService } from 'src/app/core/services/gerenciamento/mes.service';
import { GanhosService } from 'src/app/core/services/usuario/ganhos.service';
import { FormValidations } from 'src/app/views/shared/validations/form-validations';

@Component({
  selector: 'app-novo-ganho',
  templateUrl: './novo-ganho.component.html',
  styleUrls: ['./novo-ganho.component.css']
})
export class NovoGanhoComponent extends GanhoDespesa implements OnInit, AfterViewInit, OnDestroy, IComponenteGenerico {

  constructor(
      protected override router: Router,
      protected override categoriaService: CategoriasService,
      protected override mesService: MesService,
      protected override fb: FormBuilder,
      private ganhosService: GanhosService
    ) {
    super(router, categoriaService, mesService, fb);
  }

  /* ciclos */
  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.iniciarForm();
    //this.getCartoesPeloUsuarioId();
    this.getCategoriasGanhos();
    this.getMeses();
  }

  ngAfterViewInit(): void {
    this.habilitarCampoDia();
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(e => e.unsubscribe());
  }

  /* Formulario */
  iniciarForm(): void {
    this.form = this.fb.group({
      /* cartaoId: [null, Validators.required], */
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
  postGanho(form: FormGroup): void {
    this.inscricoes.push(
      this.ganhosService.postGanho(form.value as Ganho).subscribe(() => {
        this.router.navigate(['/usuarios/financeiro/ganhos/listagem']);
      })
    );
  }
}
