import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AtualizarCategoriaComponent } from './atualizar-categoria/atualizar-categoria.component';
import { ListagemCategoriasComponent } from './listagem-categorias/listagem-categorias.component';
import { NovaCategoriaComponent } from './nova-categoria/nova-categoria.component';

export const categoriasRoutes: Routes = [
  { path: 'listagem', component: ListagemCategoriasComponent, canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: 'nova', component: NovaCategoriaComponent, canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: 'atualizar/:id', component: AtualizarCategoriaComponent, canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: '', redirectTo: 'listagem', pathMatch: 'full'},
  { path: '**', redirectTo: 'listagem', pathMatch: 'full'}
];
