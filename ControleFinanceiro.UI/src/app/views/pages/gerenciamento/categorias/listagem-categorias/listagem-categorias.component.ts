import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { Categoria } from 'src/app/core/models/classes/categoria/Categoria.model';
import { Subscription, Observable, startWith, map } from 'rxjs';
import { ModalComponent } from 'src/app/views/shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { Tabela } from 'src/app/core/models/classes/Tabela.model';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.css'],
})
export class ListagemCategoriasComponent implements OnInit {
  public tabela!: Tabela;
  public categorias: Categoria[] = new Array();
  public autoCompleteInput: FormControl = new FormControl();
  public opcoesCategorias: string[] = new Array();
  public nomesCategorias!: Observable<string[]>;
  public inscricoes: Subscription[] = new Array();

  constructor(
    private categoriasService: CategoriasService,
    private mensageria: MensageriaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCategorias();
    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.filtrarNomes(nome || ''))
    );
  }

  public construirTabela(dados?: Categoria[]): void {
    this.tabela = {
      dados: dados ?? [],
      colunas: [['Nome', 'Ícone', 'Tipo'], ['nome', 'icone', 'tipo']],
      componente: 'categoria',
    };
  }

  /* Categoria */
  public getAllCategorias(): void {
    this.inscricoes.push(
      this.categoriasService.getAll().subscribe({
        next: (res) => {
          this.categorias = new Array();
          this.opcoesCategorias = new Array();
          res.forEach((categoria) => {
            this.categorias.push(new Categoria(categoria));
            this.opcoesCategorias.push(categoria.nome);
          });

          this.construirTabela(this.categorias);
        }
      })
    );
  }

  public deleteCategoriaModal(categoriaId: number): void {
    const dialog = this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Deletar Categoria',
        descricao: 'Deseja deletar esta categoria?',
        btn: ['Sim', 'Não'],
      },
    });

    this.inscricoes.push(
      dialog.afterClosed().subscribe({
        next: (res) => {
          if (res) {
            this.deleteCategoria(categoriaId);
          }
        },
        error: (err) => {
          this.mensageria.openSnackBar(err.message);
        },
      })
    );
  }

  public deleteCategoria(categoriaId: number): void {
    this.inscricoes.push(
      this.categoriasService.deleteCategoria(categoriaId).subscribe({
        next: (res) => {
          this.mensageria.openSnackBar(res.mensagem);
        },
        error: (err) => {
          this.mensageria.openSnackBar(err.message);
        },
        complete: () => {
          this.getAllCategorias();
        },
      })
    );
  }

  public filtrarNomes(nome: string): string[] {
    if (nome && nome.trim().length >= 1) {
      this.inscricoes.push(
        this.categoriasService.filtrarCategoria(nome.toLowerCase()).subscribe({
          next: (res) => {
            this.categorias = new Array();
            res.forEach((categoria) => {
              this.categorias.push(new Categoria(categoria));
            });
            this.construirTabela(this.categorias);
          },
          error: (err) => {
            this.mensageria.openSnackBar(err.message);
          },
        })
      );
    } else if (!nome) {
      this.getAllCategorias();
    }
    return this.opcoesCategorias.filter((categoria) =>
      categoria.toLowerCase().includes(nome.toLowerCase())
    );
  }

  /* Rota */
  public atualizarCategoriaRoute(categoriaId: string): string {
    return `/categoria/atualizar/${window.btoa(categoriaId)}`;
  }
}
