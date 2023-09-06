import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartoesRoutes } from './cartoes.routing';
import { NovoCartaoComponent } from './novo-cartao/novo-cartao.component';
import { ListagemCartoesComponent } from './listagem-cartoes/listagem-cartoes.component';
import { ComponentsModule } from 'src/app/views/shared/components/components.module';
import { AtualizarCartaoComponent } from './atualizar-cartao/atualizar-cartao.component';



@NgModule({
  declarations: [
    NovoCartaoComponent,
    ListagemCartoesComponent,
    AtualizarCartaoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(CartoesRoutes)
  ]
})
export class CartoesModule { }
