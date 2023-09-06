import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Despesa } from 'src/app/core/models/classes/cartao/Despesa.model';
import { Tabela } from 'src/app/core/models/classes/Tabela.model';
import { DespesasService } from 'src/app/core/services/usuario/despesas.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { ModalComponent } from 'src/app/views/shared/components/modal/modal.component';

@Component({
  selector: 'app-listagem-despesas',
  templateUrl: './listagem-despesas.component.html',
  styleUrls: ['./listagem-despesas.component.css']
})
export class ListagemDespesasComponent implements OnInit, OnDestroy {

  nomeUsuario!: string;
  usuarioId!: string;
  despesas: Despesa[] = new Array();
  tabela!: Tabela;
  autoCompleteInput: FormControl = new FormControl();
  opcoesDespesas: string[] = new Array();
  inscricoes: Subscription[] = new Array();

  constructor(private dialog: MatDialog, private despesasService: DespesasService) { }

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.nomeUsuario = localStorage.getItem('nomeUsuario') as string;
    this.getDespesasUsuario();
    this.construirTabela();
    this.filtrarTabela();
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(x => x.unsubscribe());
  }

  /* Tabela */
  public construirTabela(dados?: Despesa[]): void {
    this.tabela = {
      dados: dados ?? [],
      colunas: [['Id', 'Descrição', 'Categoria', 'Valor', 'Data'], ['id', 'descricao', 'categoria', 'valor', 'data']],
      componente: 'despesas'
    }
  }

  public filtrarTabela(): void {
    this.inscricoes.push(
      this.autoCompleteInput.valueChanges.subscribe(valor => {
        if(valor) {
          this.opcoesDespesas = new Array();
          let dadosTabela: Despesa[] = new Array();
          let despesasFiltradas = this.despesas.filter(x => x.descricao.toLowerCase().includes(valor.toLowerCase()));

          despesasFiltradas.forEach(d => {
            dadosTabela.push(new Despesa(d));
            this.opcoesDespesas.push(d.descricao);
          });

          this.construirTabela(dadosTabela);
        }
        else {
          this.construirTabela(this.despesas);
        }
      })
    );
  }

  /* Serviços */
  getDespesasUsuario(): void {
    this.inscricoes.push(
      this.despesasService.getDespesaPeloUsuarioID(this.usuarioId).subscribe(res => {
        this.despesas = new Array();

        res.forEach(d => {
          this.despesas.push(d);
          this.opcoesDespesas.push(d.descricao);
        })

        this.construirTabela(this.despesas);
      })
    );
  }

  deleteDespesa(idDespesa: number): void {
    this.inscricoes.push(
      this.despesasService.deleteDespesa(idDespesa).subscribe({
        next: () => {
          this.getDespesasUsuario();
        }
      })
    );
  }

  /* Modal */
  deleteDespesaModal(idDespesa: number): void {
    const dialog = this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Deletar Despesa',
        descricao: 'Deseja deletar esta despesa?',
        btn: ['Sim', 'Não'],
      }
    });

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.deleteDespesa(idDespesa);
      }
    });
  }
}
