import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { FormComponent } from 'src/app/views/shared/components/form/form.component';
import { Categoria } from 'src/app/core/models/classes/categoria/Categoria.model';
import { CategoriaGenerica } from 'src/app/core/models/classes/categoria/CategoriaGenerica.model';
import { TiposService } from 'src/app/core/services/gerenciamento/tipos.service';
import { Tipo } from 'src/app/core/models/classes/Tipo.model';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['./atualizar-categoria.component.css']
})
export class AtualizarCategoriaComponent extends CategoriaGenerica implements OnInit {

  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;

  public categoria!: Categoria;
  public categoriaId!: number;
  public inscricoes: Subscription[] = new Array();
  public tipos: Tipo[] = new Array();

  constructor(private categoriasService: CategoriasService, private tiposService: TiposService, private mensageria: MensageriaService, private route: ActivatedRoute, private router: Router) {
    super();
    this.categoriaId = Number(window.atob(this.route.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.getCategoriaPorId();
    this.getAllTipos();
  }

  /* Chamada API */
  public getCategoriaPorId(): void {
    this.inscricoes.push(this.categoriasService.getById(this.categoriaId).subscribe({
      next: (res) => {
        this.formComponent.form.patchValue(res);
        this.categoria = res;
      },
      error: (err) => {
        this.mensageria.openSnackBar(err.message);
      }
    }));
  }

  public putCategoria(form: FormGroup): void {
    this.categoria = {
      id: this.categoriaId,
      nome: form.get('nome')?.value,
      icone: form.get('icone')?.value,
      tipoId: form.get('tipoId')?.value
    }

    this.inscricoes.push(this.categoriasService.putCategoria(this.categoriaId, this.categoria).subscribe({
      error: (err) => {
        this.mensageria.openSnackBar(err.message);
      },
      complete: () => {
        this.mensageria.openSnackBar('Categoria Atualizada com Sucesso!');
        this.router.navigate(['categoria/listagem']);
      }
    }))
  }

  public getAllTipos(): void {
    this.inscricoes.push(
      this.tiposService.getAll().subscribe(res => {
        this.tipos = res;
      })
    );
  }
}
