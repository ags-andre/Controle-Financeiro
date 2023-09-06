import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuncoesService } from 'src/app/core/services/gerenciamento/funcoes.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { Funcao } from 'src/app/core/models/classes/funcao/Funcao.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { FuncaoGenerica } from 'src/app/core/models/classes/funcao/FuncaoGenerica.model';

@Component({
  selector: 'app-nova-funcao',
  templateUrl: './nova-funcao.component.html',
  styleUrls: ['./nova-funcao.component.css']
})
export class NovaFuncaoComponent extends FuncaoGenerica implements OnInit {

  public inscricoes: Subscription[] = new Array();

  constructor(private funcoesService: FuncoesService, private mensageria: MensageriaService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  public postFuncao(form: FormGroup): void {
    this.inscricoes.push(this.funcoesService.postFuncao(form.value as Funcao).subscribe({
      next: (res) => {
        this.mensageria.openSnackBar("Função cadastrada com sucesso!");
        this.router.navigate(['/gerenciamento/funcao/listagem']);
      }
    }));
  }
}
