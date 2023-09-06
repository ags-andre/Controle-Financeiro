import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AtualizarFuncaoComponent } from './atualizar-funcao/atualizar-funcao.component';
import { ListagemFuncoesComponent } from './listagem-funcoes/listagem-funcoes.component';
import { NovaFuncaoComponent } from './nova-funcao/nova-funcao.component';

export const funcoesRoutes: Routes = [
  { path: 'nova', component: NovaFuncaoComponent, canActivate:[AuthGuard], canLoad:[AuthGuard]},
  { path: 'listagem', component: ListagemFuncoesComponent, canActivate:[AuthGuard], canLoad:[AuthGuard]},
  { path: 'atualizar/:id', component: AtualizarFuncaoComponent, canActivate:[AuthGuard], canLoad:[AuthGuard]},
  { path: '', redirectTo: 'listagem', pathMatch: 'full'},
  { path: '**', redirectTo: 'listagem', pathMatch: 'full'}
];

