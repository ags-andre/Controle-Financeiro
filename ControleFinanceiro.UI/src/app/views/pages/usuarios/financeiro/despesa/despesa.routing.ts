import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AtualizarDespesasComponent } from './atualizar-despesas/atualizar-despesas.component';
import { ListagemDespesasCartaoComponent } from './listagem-despesas-cartao/listagem-despesas-cartao.component';
import { ListagemDespesasComponent } from './listagem-despesas/listagem-despesas.component';
import { NovaDespesaComponent } from './nova-despesa/nova-despesa.component';

export const despesaRoutes: Routes = [
  { path: 'nova', component: NovaDespesaComponent, canLoad:[AuthGuard], canActivate: [AuthGuard] },
  { path: 'listagem', component: ListagemDespesasComponent, canLoad:[AuthGuard], canActivate: [AuthGuard] },
  { path: 'cartao/listagem/:id', component: ListagemDespesasCartaoComponent, canLoad:[AuthGuard], canActivate: [AuthGuard] },
  { path: 'atualizar/:id', component: AtualizarDespesasComponent, canLoad:[AuthGuard], canActivate: [AuthGuard] },
];
