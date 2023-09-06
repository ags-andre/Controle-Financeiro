import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import { TabelaComponent } from './tabela/tabela.component';
import { MaterialModule } from '../design/material.module';
import { DirectivesModule } from 'src/app/core/utils/directives/directives.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FormComponent, ModalComponent, TabelaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DirectivesModule,
    RouterModule
  ],
  exports: [FormComponent, TabelaComponent, ReactiveFormsModule, FormsModule, MaterialModule, DirectivesModule]
})
export class ComponentsModule { }
