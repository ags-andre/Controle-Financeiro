import { Directive, ElementRef, HostListener } from '@angular/core';
import { MaskApplierService } from 'ngx-mask';

@Directive({
  selector: '[DiretivaInteligente]'
})
export class DiretivaInteligente {

  private apagouValor: boolean = false;

  constructor(private el: ElementRef, private maskService: MaskApplierService) { }

  @HostListener('input') validarString() {
    let nativeElement = this.el.nativeElement;

    if(nativeElement.labels[0].innerText.includes('Limite') || nativeElement.labels[0].innerText.includes('Valor')) {
      this.mascaraMonetaria(nativeElement)
    }
    else if(nativeElement.labels[0].innerText.includes('Número')) {
      this.mascaraNumeroCartao(nativeElement);
    }
  }

  @HostListener('keydown.backspace') teclaApagar() {
    this.apagouValor = true;
  }

  /* private mascaraMonetaria(el: any) {
    const R$ = /[^A-Z$']/;

    el.value = el.value.replace('R$', '')
    if(el.value.length % 4 == 0) {
      el.value = el.value.substring(0, 1) + '.' + el.value.substring(2, -1);
    }
    //if(!el.value.includes('R$') && R$.test(el.value)) el.value = 'R$' + el.value;

  } */

  private mascaraMonetaria(el: any): void {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    })

    el.value = formatter.format(el.value.replace(/[^0-9]/g, ''));
  }

  private mascaraNumeroCartao(el: any): void {
    el.value =  this.maskService.applyMask(el.value, '0000 0000 0000 0000')
  }
}
