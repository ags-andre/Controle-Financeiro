import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { Cartao } from 'src/app/core/models/classes/cartao/Cartao.model';
import { Despesa } from 'src/app/core/models/classes/cartao/Despesa.model';
import { Tabela } from 'src/app/core/models/classes/Tabela.model';
import { CartaoService } from 'src/app/core/services/usuario/cartao.service';
import { DespesasService } from 'src/app/core/services/usuario/despesas.service';
import { ModalComponent } from 'src/app/views/shared/components/modal/modal.component';

@Component({
  selector: 'app-listagem-despesas-cartao',
  templateUrl: './listagem-despesas-cartao.component.html',
  styleUrls: ['./listagem-despesas-cartao.component.css']
})
export class ListagemDespesasCartaoComponent implements OnInit, OnDestroy {

  cartaoId!: number;
  cartao!: Cartao;
  despesas: Despesa[] = new Array();
  tabela!: Tabela;
  autoCompleteInput: FormControl = new FormControl();
  nomesDespesas!: Observable<string[]>;
  opcoesDespesas!: string[];
  inscricoes: Subscription[] = new Array();

  constructor(private cartaoService: CartaoService, private despesaService: DespesasService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cartaoId = Number(this.route.snapshot.params['id']);
    this.getCartaoPeloId();
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
      colunas: [['Numero', 'Descricao', 'Categoria', 'Valor', 'Data'], ['id', 'descricao', 'categoria', 'valor', 'data']],
      componente: 'despesas'
    }
  }

  public filtrarTabela(): void {
    this.inscricoes.push(
      this.autoCompleteInput.valueChanges.subscribe(valor => {
        if(valor) {
          this.despesas = new Array();
          this.opcoesDespesas = new Array();
          let despesasFiltradas = this.despesas.filter(x => x.descricao.toLowerCase().includes(valor.toLowerCase()));

          despesasFiltradas.forEach(d => {
            this.despesas.push(new Despesa(d))
            this.opcoesDespesas.push(d.descricao)
          });
          this.construirTabela(despesasFiltradas);
        }
        else {
          this.getDespesasDoCartao();
        }
      })
    );
  }

  /* Serviços */
  getCartaoPeloId(): void {
    this.inscricoes.push(
      this.cartaoService.getById(this.cartaoId).subscribe(res => {
        this.cartao = new Cartao(res);
        this.getDespesasDoCartao();
      })
    );
  }

  getDespesasDoCartao(): void {
    this.inscricoes.push(
      this.despesaService.getDespesaDoCartao(this.cartaoId).subscribe(res => {
        this.despesas = new Array();
        this.opcoesDespesas = new Array();

        res.forEach((despesa) => {
          this.despesas.push(new Despesa(despesa));
          this.opcoesDespesas.push(despesa.descricao);
        });
        this.construirTabela(this.despesas);
      })
    );
  }

  deleteDespesa(idDespesa: number): void {
    this.inscricoes.push(
      this.despesaService.deleteDespesa(idDespesa).subscribe({
        next: () => {

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
