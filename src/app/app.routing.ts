import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./views/pages/pages.module').then(p => p.PagesModule)},
  { path: '**', redirectTo: '', pathMatch: 'full'},
];
export class AppRoutingModule { }
