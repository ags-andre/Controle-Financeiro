import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovaFuncaoComponent } from './nova-funcao/nova-funcao.component';
import { ListagemFuncoesComponent } from './listagem-funcoes/listagem-funcoes.component';
import { AtualizarFuncaoComponent } from './atualizar-funcao/atualizar-funcao.component';
import { funcoesRoutes } from './funcoes.routing';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/views/shared/components/components.module';


@NgModule({
  declarations: [
    NovaFuncaoComponent,
    ListagemFuncoesComponent,
    AtualizarFuncaoComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(funcoesRoutes)
  ]
})
export class FuncoesModule { }
