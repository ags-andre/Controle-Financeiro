import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TiposService } from 'src/app/core/services/gerenciamento/tipos.service';
import { InfosForm } from '../../../../core/models/classes/InfosForm.model';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { ComponenteGenerico } from 'src/app/core/models/genericos/ComponenteGenerico.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends ComponenteGenerico implements OnInit, IComponenteGenerico {

  @Input() tituloComponent: string[] = new Array();
  @Input() camposInput: InfosForm[] = new Array();
  @Input() camposSelect: InfosForm[] = new Array();
  @Input() valoresSelect: any[] = new Array();
  @Input() receberForm!: FormGroup;
  @Input() listaDias!: number[];
  @Output() emitForm: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    private tiposService: TiposService,
    private mensageria: MensageriaService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.iniciarForm();
    //this.getAllTipos();
    //this.propriedade;
  }

  /* Ações formulario */
  public iniciarForm(): void {
    this.form = this.receberForm;
  }

  public get propriedade(): Object {
    return this.form.controls;
  }

  public enviarFormulario(): void {
    this.emitForm.emit(this.form);
  }

  public voltar(): void {
    window.history.go(-1);
  }

  /* Formatar valores select */
  public selecionarIdElemento(el: any) {
    let campoId = '';
    Object.keys(el).forEach(x => {
      if(x == 'id') {
        campoId = x;
      }
    })
    return el[campoId];
  }

  public selecionarNomeElemento(el: any) {
    let campoNome = '';
    Object.keys(el).forEach(x => {
      if(x.toLowerCase().includes('nome')) {
        campoNome = x;
      }
    })

    return el[campoNome];
  }
}
