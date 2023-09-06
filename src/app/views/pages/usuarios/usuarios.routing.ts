import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AtualizaUsuarioComponent } from './atualiza-usuario/atualiza-usuario.component';
import { CadastrarUsuarioComponent } from './cadastrar/cadastrar-usuario.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';

export const usuarioRoutes: Routes = [
  { path: 'cadastrar', component: CadastrarUsuarioComponent },
  { path: 'atualizar', component: AtualizaUsuarioComponent },
  { path: 'cartoes', loadChildren: () => import('./cartoes/cartoes.module').then(c => c.CartoesModule), canLoad:[AuthGuard] },
  { path: 'financeiro', component: FinanceiroComponent, canLoad: [AuthGuard], canActivate: [AuthGuard], children:
    [
      { path: 'despesas', loadChildren: () => import('./financeiro/despesa/despesa.module').then(c => c.DespesasModule), canLoad:[AuthGuard] },
      { path: 'ganhos', loadChildren: () => import('./financeiro/ganhos/ganhos.module').then(c => c.GanhosModule), canLoad:[AuthGuard] },
    ]
  }
  //{ path: 'despesas', loadChildren: () => import('./despesa/despesa.module').then(c => c.DespesasModule), canLoad:[AuthGuard] }
];

