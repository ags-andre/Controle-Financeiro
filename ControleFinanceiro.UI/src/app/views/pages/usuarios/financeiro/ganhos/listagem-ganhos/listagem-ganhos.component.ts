import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Ganho } from 'src/app/core/models/classes/cartao/Ganho.model';
import { Tabela } from 'src/app/core/models/classes/Tabela.model';
import { GanhosService } from 'src/app/core/services/usuario/ganhos.service';
import { ModalComponent } from 'src/app/views/shared/components/modal/modal.component';

@Component({
  selector: 'app-listagem-ganhos',
  templateUrl: './listagem-ganhos.component.html',
  styleUrls: ['./listagem-ganhos.component.css']
})
export class ListagemGanhosComponent implements OnInit {

  usuarioId!: string;
  ganhos!: Ganho[];
  tabela!: Tabela;
  autoCompleteInput: FormControl = new FormControl();
  opcoesGanhos: string[] = new Array();
  inscricoes: Subscription[] = new Array();
  erro!: boolean;

  constructor(private dialog: MatDialog, private ganhosService: GanhosService) { }

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('idUsuario') as string;
    this.getGanhosDoUsuario();
    this.autoCompleteInput.valueChanges.subscribe();
  }

  /* Tabela */
  public construirTabela(dados?: Ganho[]): void {
    this.tabela = {
      dados: dados ?? [],
      colunas: [['Numero', 'Descricao', 'Categoria', 'Valor', 'Data'], ['id', 'descricao', 'categoria', 'valor', 'data']],
      componente: 'ganhos'
    }
  }

  public filtrarTabela(): void {
    this.inscricoes.push(
      this.autoCompleteInput.valueChanges.subscribe(valor => {
        if(valor) {
          this.ganhos = new Array();
          this.opcoesGanhos = new Array();
          let ganhosFiltradas = this.ganhos.filter(x => x.descricao.toLowerCase().includes(valor.toLowerCase()));

          ganhosFiltradas.forEach(g => {
            this.ganhos.push(new Ganho(g))
            this.opcoesGanhos.push(g.descricao)
          });

          this.construirTabela(ganhosFiltradas);
        }
        else {
          this.getGanhosDoUsuario();
        }
      })
    );
  }

  /* Serviço */
  getGanhosDoUsuario(): void {
    this.inscricoes.push(
      this.ganhosService.getGanhosPeloUsuarioId(this.usuarioId).subscribe(res => {
        this.ganhos = new Array();
        this.opcoesGanhos = new Array();

        res.forEach(g => {
          this.ganhos.push(new Ganho(g));
          this.opcoesGanhos.push(g.descricao);
        });
        this.construirTabela(this.ganhos);
      })
    );
  }

  deleteganho(idGanho: number): void {
    this.inscricoes.push(
      this.ganhosService.deleteGanho(idGanho).subscribe(() => {
        this.getGanhosDoUsuario();
      })
    );
  }

  /* Modal */
  deleteGanhosModal(idGanho: number): void {
    const dialog = this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Deletar Ganho',
        descricao: 'Deseja deletar este Ganho?',
        btn: ['Sim', 'Não'],
      }
    });

    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.deleteganho(idGanho);
      }
    });
  }
}
