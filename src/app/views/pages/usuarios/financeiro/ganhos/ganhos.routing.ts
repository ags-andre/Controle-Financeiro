import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AtualizarGanhoComponent } from './atualizar-ganho/atualizar-ganho.component';
import { ListagemGanhosComponent } from './listagem-ganhos/listagem-ganhos.component';
import { NovoGanhoComponent } from './novo-ganho/novo-ganho.component';

export const routesGanhos: Routes = [
  { path: 'listagem', component: ListagemGanhosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: 'novo', component: NovoGanhoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  { path: 'atualizar/:id', component: AtualizarGanhoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]}
];

