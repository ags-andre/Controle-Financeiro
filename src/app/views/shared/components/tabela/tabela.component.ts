import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tabela } from '../../../../core/models/classes/Tabela.model';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit, OnChanges {

  @Input() tabela!: Tabela;
  @Output() acaoTabela: EventEmitter<any> = new EventEmitter();
  dadosTabela!: MatTableDataSource<any>;
  colunasTabela: string[] = new Array();
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(private router: Router) { }

  ngOnInit(): void {
    let colunasPadroes = this.tabela.componente == 'cartoes' ? ['Despesas', 'Ações'] : ['Ações'];

    this.dadosTabela = new MatTableDataSource(this.tabela.dados);
    this.colunasTabela = [...this.tabela.colunas[0], ...colunasPadroes];
    this.dadosTabela.paginator = this.paginator;
  }

  ngOnChanges(): void {
    let colunasPadroes = this.tabela.componente == 'cartoes' ? ['Despesas', 'Ações'] : ['Ações'];

    setTimeout(() => {
      this.dadosTabela = new MatTableDataSource(this.tabela.dados);
      this.colunasTabela = [...this.tabela.colunas[0], ...colunasPadroes];
      this.dadosTabela.paginator = this.paginator;
    });
  }

  getAtributoElemento(element: any, coluna: string[], index: number): string {
    let atributo = '';

    for (var key in element) {
      if(key.toLowerCase() == coluna[index].toLowerCase()) {
        //console.log(element[key])
        if((coluna[index].toLowerCase() == 'tipo' || coluna[index].toLowerCase() == 'categoria')) {
          atributo = element[key].nome;
        }
        else {
          atributo = element[key];
        }
      }
      else if(key.toLowerCase() == 'dia' && coluna[index].toLowerCase() == 'data' && (this.tabela.componente == 'despesas' || this.tabela.componente == 'ganhos')) {
        atributo = `${element.dia}/${element.mesId}/${element.ano}`;
      }
    }
    return atributo;
  }

  rotaAtualizar(classe: any): void {
    let id: any;
    Object.keys(classe).every(x => {
      if(x.toUpperCase().slice(-2).includes('ID')) {
        id = classe[x];
        return false;
      }
      return true;
    })

    if(this.tabela.componente != 'cartoes' && this.tabela.componente != 'despesas' && this.tabela.componente != 'ganhos') {
      this.router.navigate([`/gerenciamento/${this.tabela.componente}/atualizar/${window.btoa(String(id))}`]);
    } else if(this.tabela.componente == 'cartoes'){
      this.router.navigate([`/usuarios/${this.tabela.componente}/atualizar/${window.btoa(String(id))}`]);
    } else {
      this.router.navigate([`/usuarios/financeiro/${this.tabela.componente}/atualizar/${window.btoa(String(id))}`]);
    }
  }

  modalDeletar(classe: any): void {
    const id = classe.id;
    this.acaoTabela.emit(id);
  }
}

