import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Directive({
  selector: '[TabelaInteligente]'
})
export class TabelaDirective implements AfterViewInit {
  tabela: any;

  constructor(private el: ElementRef, private maskService: MaskApplierService) { }

  ngAfterViewInit(): void {
    if(this.el.nativeElement.children[0].localName == 'span') {
      switch (this.el.nativeElement.dataset.label) {
        case 'Valor':
          this.mascaraMonetaria();
          break;
        case 'Limite':
          this.mascaraMonetaria();
          break;
        case 'Numero':
          this.mascaraNumeroCartao();
          break;
        default:
          break;
      }
    }
  }

  private mascaraMonetaria(): void {
    let element = this.el.nativeElement.children[0];
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    })

    element.innerText = formatter.format(element.innerText.replace(/[^0-9]/g, ''));
  }

  private mascaraNumeroCartao(): void {
    let element = this.el.nativeElement.children[0];
    element.innerText =  this.maskService.applyMask(element.innerText, '0000 0000 0000 0000')
  }
}
