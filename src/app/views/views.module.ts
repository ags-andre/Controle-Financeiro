import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
//import { ModalComponent } from './shared/components/modal/modal.component';

@NgModule({
  declarations: [
    //ModalComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
  ],
  exports: [PagesModule]
})
export class ViewsModule { }
