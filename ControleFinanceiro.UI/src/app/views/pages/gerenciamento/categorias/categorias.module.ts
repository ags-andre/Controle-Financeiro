import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListagemCategoriasComponent } from './listagem-categorias/listagem-categorias.component';
import { NovaCategoriaComponent } from './nova-categoria/nova-categoria.component';
import { AtualizarCategoriaComponent } from './atualizar-categoria/atualizar-categoria.component';
import { categoriasRoutes } from './categorias.routing';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/views/shared/components/components.module';

@NgModule({
  declarations: [
    ListagemCategoriasComponent,
    NovaCategoriaComponent,
    AtualizarCategoriaComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(categoriasRoutes)
  ]
})
export class CategoriasModule { }
