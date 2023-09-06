import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuncoesService } from 'src/app/core/services/gerenciamento/funcoes.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { FormComponent } from 'src/app/views/shared/components/form/form.component';
import { Funcao } from 'src/app/core/models/classes/funcao/Funcao.model';
import { FuncaoGenerica } from 'src/app/core/models/classes/funcao/FuncaoGenerica.model';

@Component({
  selector: 'app-atualizar-funcao',
  templateUrl: './atualizar-funcao.component.html',
  styleUrls: ['./atualizar-funcao.component.css']
})
export class AtualizarFuncaoComponent extends FuncaoGenerica implements OnInit {

  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;

  funcao!: Funcao;
  funcaoId!: string;
  inscricoes: Subscription[] = new Array();

  constructor(private funcaoService: FuncoesService, private mensageria: MensageriaService, private route: ActivatedRoute, private router: Router) {
    super();
    this.funcaoId = window.atob(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.getFuncaoPeloId();
  }

  /* Chamadas API */
  public getFuncaoPeloId(): void {
    this.inscricoes.push(this.funcaoService.getById(this.funcaoId).subscribe({
      next: (res) => {
        this.formComponent.form.patchValue(res);
      },
      error: (err) => {
        this.mensageria.openSnackBar(`Ocorreu um erro. Status: ${err.status}`);
      }
    }));
  }

  public putFuncao(form: FormGroup): void {
    this.funcao = new Funcao(this.funcaoId, form.value as Funcao);

    this.inscricoes.push(this.funcaoService.putFuncao(this.funcaoId, this.funcao).subscribe({
      next: (res) => {
        this.mensageria.openSnackBar('Atualização salva com sucesso');
        this.router.navigate(['/gerenciamento/funcao/listagem']);
      }
    }));
  }
}
