import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoginComponent } from './login/login.component';

export const pagesRoutes: Routes = [
  { path: 'gerenciamento', loadChildren: () => import('./gerenciamento/gerenciamento.module').then(m => m.GerenciamentoModule), canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'gerenciamento', pathMatch: 'full'}
];

