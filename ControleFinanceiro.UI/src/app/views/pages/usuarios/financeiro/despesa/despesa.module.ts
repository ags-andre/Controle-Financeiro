import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { despesaRoutes } from './despesa.routing';
import { RouterModule } from '@angular/router';
import { ListagemDespesasComponent } from './listagem-despesas/listagem-despesas.component';
import { ComponentsModule } from 'src/app/views/shared/components/components.module';
import { AtualizarDespesasComponent } from './atualizar-despesas/atualizar-despesas.component';
import { ListagemDespesasCartaoComponent } from './listagem-despesas-cartao/listagem-despesas-cartao.component';
import { NovaDespesaComponent } from './nova-despesa/nova-despesa.component';

@NgModule({
  declarations: [
    ListagemDespesasComponent,
    AtualizarDespesasComponent,
    ListagemDespesasCartaoComponent,
    NovaDespesaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(despesaRoutes)
  ]
})
export class DespesasModule { }
