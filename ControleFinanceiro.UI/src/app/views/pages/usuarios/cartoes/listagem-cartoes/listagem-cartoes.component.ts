import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { Cartao } from 'src/app/core/models/classes/cartao/Cartao.model';
import { Tabela } from 'src/app/core/models/classes/Tabela.model';
import { CartaoService } from 'src/app/core/services/usuario/cartao.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { ModalComponent } from 'src/app/views/shared/components/modal/modal.component';

@Component({
  selector: 'app-listagem-cartoes',
  templateUrl: './listagem-cartoes.component.html',
  styleUrls: ['./listagem-cartoes.component.css']
})
export class ListagemCartoesComponent implements OnInit, OnDestroy {

  nomeUsuario!: string;
  cartoes:  Cartao[] = new Array();
  tabela!: Tabela;
  nomesCartoes!: string[];
  autoCompleteInput: FormControl = new FormControl();
  opcoesCartoes: string[] = new Array();
  inscricoes: Subscription[] = new Array();

  constructor(private cartaoService: CartaoService, private mensageria: MensageriaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.nomeUsuario = localStorage.getItem('nomeUsuario') as string;
    this.getCartoesUsuario();
    this.construirTabela();
    this.filtrarTabela();
  }

  ngOnDestroy(): void {
    this.inscricoes.forEach(x => x.unsubscribe());
  }

  /* Tabela */
  public construirTabela(dados?: Cartao[]): void {
    this.tabela = {
      dados: dados ?? [],
      colunas: [['Nome', 'Bandeira', 'Numero', 'Limite'], ['nome', 'bandeira', 'numero', 'limite']],
      componente: 'cartoes'
    }
  }

  public filtrarTabela(): void {
    this.inscricoes.push(
      this.autoCompleteInput.valueChanges.subscribe(valor => {
        if(valor) {
          this.cartoes = new Array();
          this.opcoesCartoes = new Array();
          let cartoesFiltrados = this.cartoes.filter(x => x.nome.toLowerCase().includes(valor.toLowerCase()));

          cartoesFiltrados.forEach(c => {
            this.cartoes.push(new Cartao(c));
            this.opcoesCartoes.push(c.nome);
          });

          this.construirTabela(cartoesFiltrados);
        }
        else {
          this.getCartoesUsuario();
        }
      })
    );
  }

  /* Serviços */
  getCartoesUsuario(): void {
    this.cartaoService.getCartoesByIdUsuario(localStorage.getItem('idUsuario') as string).subscribe(res => {
      this.cartoes = new Array();
      this.opcoesCartoes = new Array();

      res.forEach(c => {
        this.cartoes.push(new Cartao(c));
        this.opcoesCartoes.push(c.nome);
      })

      this.construirTabela(this.cartoes);
    })
  }

  public deleteCartao(cartaoId: number): void {
    this.inscricoes.push(this.cartaoService.deleteCartao(cartaoId).subscribe(res => {
      this.mensageria.openSnackBar(res.mensagem);
      this.getCartoesUsuario();
    }));
  }

  /* Modal */
  public deleteCartaoModal(cartaoId: number): void {
    const dialog = this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Deletar Cartão',
        descricao: 'Deseja deletar esta cartão?',
        btn: ['Sim', 'Não'],
      }
    });

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.deleteCartao(cartaoId);
      }
    });
  }
}
