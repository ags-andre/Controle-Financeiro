import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const gerenciamentoRoutes: Routes = [
  { path: 'categoria', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule), canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: 'funcao', loadChildren: () => import('./funcoes/funcoes.module').then(m => m.FuncoesModule), canActivate:[AuthGuard], canLoad:[AuthGuard]},
  { path: '', redirectTo: 'categoria', pathMatch: 'full'}
];

