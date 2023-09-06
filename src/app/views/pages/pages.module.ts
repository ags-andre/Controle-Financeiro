import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routing';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(pagesRoutes)
  ]
})
export class PagesModule { }
