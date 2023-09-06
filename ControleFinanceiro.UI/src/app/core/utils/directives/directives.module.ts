import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApenasStringDirective } from './apenas-string.directive';
import { ApenasNumberDirective } from './apenas-number.directive';
import { ApenasDigitosDirective } from './apenas-digitos.directive';
import { DiretivaInteligente } from './diretiva-inteligente.directive';
import { TabelaDirective } from './tabela.directive';



@NgModule({
  declarations: [ApenasStringDirective, ApenasNumberDirective, ApenasDigitosDirective, DiretivaInteligente, TabelaDirective],
  imports: [
    CommonModule
  ],
  exports: [ApenasStringDirective, ApenasNumberDirective, ApenasDigitosDirective, DiretivaInteligente, TabelaDirective]
})
export class DirectivesModule {}
