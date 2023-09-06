import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesGanhos } from './ganhos.routing';
import { ListagemGanhosComponent } from './listagem-ganhos/listagem-ganhos.component';
import { NovoGanhoComponent } from './novo-ganho/novo-ganho.component';
import { AtualizarGanhoComponent } from './atualizar-ganho/atualizar-ganho.component';
import { ComponentsModule } from 'src/app/views/shared/components/components.module';



@NgModule({
  declarations: [
    ListagemGanhosComponent,
    NovoGanhoComponent,
    AtualizarGanhoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routesGanhos)
  ]
})
export class GanhosModule { }
