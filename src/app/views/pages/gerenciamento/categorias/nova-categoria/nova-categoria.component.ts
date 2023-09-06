import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriasService } from 'src/app/core/services/gerenciamento/categorias.service';
import { MensageriaService } from 'src/app/core/services/mensageria.service';
import { Categoria } from 'src/app/core/models/classes/categoria/Categoria.model';
import { IComponenteGenerico } from 'src/app/core/models/interfaces/IComponenteGenerico.model';
import { CategoriaGenerica } from 'src/app/core/models/classes/categoria/CategoriaGenerica.model';
import { Tipo } from 'src/app/core/models/classes/Tipo.model';
import { TiposService } from 'src/app/core/services/gerenciamento/tipos.service';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent extends CategoriaGenerica implements OnInit, IComponenteGenerico {

  public categoria!: Categoria;
  public erros: string[] = new Array();
  public inscricoes: Subscription[] = new Array();
  public tipos: Tipo[] = new Array();

  constructor(private categoriasService: CategoriasService, private tiposService: TiposService, private mensageria: MensageriaService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.getAllTipos();
  }

  /* Serviços */
  public postCategoria(form: FormGroup): void {
    this.inscricoes.push(this.categoriasService.postCategoria(form.value).subscribe({
      next: () => {
        this.mensageria.openSnackBar("Categoria cadastrada com sucesso!");
      },
      error: (err) => {
        if(err.status == 400) {
          let mensagemErro: string = '';
          let numeroErros: number = 0;

          Object.keys(err.error.errors).forEach(campo => {
            err.error.errors[campo].forEach((valorCampo: string) => {
              if(valorCampo) {
                numeroErros++;
                mensagemErro = `${mensagemErro ?? ''} ${numeroErros}- ${valorCampo};`
              }
            })
          })
          this.mensageria.openSnackBar(mensagemErro);
        }
      },
      complete: () => {
        this.router.navigate(['categoria/listagem']);
      }
    }));
  }

  public getAllTipos(): void {
    this.inscricoes.push(
      this.tiposService.getAll().subscribe(res => {
        this.tipos = res;
      })
    );
  }
}
