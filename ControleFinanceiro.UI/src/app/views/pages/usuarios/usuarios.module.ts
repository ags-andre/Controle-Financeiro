import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { usuarioRoutes } from './usuarios.routing';
import { CadastrarUsuarioComponent } from './cadastrar/cadastrar-usuario.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/views/shared/components/components.module';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { AtualizaUsuarioComponent } from './atualiza-usuario/atualiza-usuario.component';


@NgModule({
  declarations: [ CadastrarUsuarioComponent, FinanceiroComponent, AtualizaUsuarioComponent ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(usuarioRoutes)
  ]
})
export class UsuariosModule { }
