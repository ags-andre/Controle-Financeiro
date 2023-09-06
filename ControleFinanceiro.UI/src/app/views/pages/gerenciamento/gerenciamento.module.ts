import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gerenciamentoRoutes } from './gerenciamento.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(gerenciamentoRoutes)
  ]
})
export class GerenciamentoModule { }
