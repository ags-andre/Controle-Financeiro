import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { AtualizarCartaoComponent } from "./atualizar-cartao/atualizar-cartao.component";
import { ListagemCartoesComponent } from "./listagem-cartoes/listagem-cartoes.component";
import { NovoCartaoComponent } from "./novo-cartao/novo-cartao.component";

export const CartoesRoutes: Routes = [
  { path: 'cadastrar', component: NovoCartaoComponent, canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: 'listagem', component: ListagemCartoesComponent, canActivate:[AuthGuard], canLoad:[AuthGuard] },
  { path: 'atualizar/:id', component: AtualizarCartaoComponent, canActivate:[AuthGuard], canLoad:[AuthGuard] },
];
