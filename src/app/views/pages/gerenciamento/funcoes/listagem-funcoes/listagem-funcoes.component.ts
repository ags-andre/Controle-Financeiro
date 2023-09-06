import { Component, OnInit, ViewChild } from '@angular/core';
import { Funcao } from 'src/app/core/models/classes/funcao/Funcao.model';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuncoesService } from 'src/app/core/services/gerenciamento/funcoes.service';
import { FormControl } from '@angular/forms';
import { ModalComponent } from 'src/app/views/shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { Router } from '@angular/router';
import { Tabela } from 'src/app/core/models/classes/Tabela.model';

@Component({
  selector: 'app-listagem-funcoes',
  templateUrl: './listagem-funcoes.component.html',
  styleUrls: ['./listagem-funcoes.component.css']
})
export class ListagemFuncoesComponent implements OnInit {

  public tabela!: Tabela;
  public funcoes: Funcao[] = new Array();
  public nomesFuncoes!: Observable<string[]>;
  public autoCompleteInput: FormControl = new FormControl();
  public opcoesFuncoes: string[] = new Array();
  public inscricoes: Subscription[] = new Array();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private funcoesService: FuncoesService, private mensageria: MensageriaService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getAllFuncoes();
    this.construirTabela();
    this.nomesFuncoes = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.filtrarFuncoes(nome || '')));
  }

  public construirTabela(dados?: Funcao[]): void {
    this.tabela = {
      dados: dados ?? [],
      colunas: [['Nome', 'Descrição'], ['nome', 'descricao']],
      componente: 'funcao'
    }
  }

  public getAllFuncoes(): void {
    this.inscricoes.push(this.funcoesService.getAll().subscribe({
      next: (res) => {
        this.funcoes = new Array();
        this.opcoesFuncoes = new Array();
        res.forEach(f => {
          let funcao = new Funcao(f.id, f);
          this.funcoes.push(funcao);
          this.opcoesFuncoes.push(f.nome);
        });
        this.construirTabela(this.funcoes);
      },
      error: (err) => {
        this.mensageria.openSnackBar(err.message);
      }
    }));
  }

  public filtrarFuncoes(nome: string): string[] {
    if(nome && nome.length >= 1) {
      this.funcoesService.filtrarFuncoes(nome).subscribe({
        next: (res) => {
          this.funcoes = new Array();
            res.forEach((funcao) => {
              this.funcoes.push(new Funcao(funcao.id, funcao));
            });
          this.construirTabela(this.funcoes);
        }
      });
    } else if(!nome) {
      this.getAllFuncoes();
    }
    return this.opcoesFuncoes.filter(nomeFuncao => nomeFuncao.toLowerCase().includes(nome.toLowerCase()));
  }

  public deleteFuncaoModal(funcaoId: string): void {
    const dialog = this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Deletar Função',
        descricao: 'Deseja deletar esta função?',
        btn: ['Sim', 'Não'],
      }
    });

    this.inscricoes.push(dialog.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this.deleteFuncao(funcaoId);
        }
      },
      error: (err) => {
        console.log(err)
      }
    }));
  }

  public deleteFuncao(funcaoId: string): void {
    this.inscricoes.push(this.funcoesService.deleteFuncao(funcaoId).subscribe({
      next: (res) => {
        this.mensageria.openSnackBar("Função deletada com sucesso!");
      },
      error: (err) => {
        this.mensageria.openSnackBar('Erro!');
      },
      complete: () => {
        this.getAllFuncoes();
      }
    }));
  }

  /* Rota */
  public atualizarFuncaoRoute(funcaoId: string): string {
    return `/funcao/atualizar/${window.btoa(funcaoId)}`
  }
}
