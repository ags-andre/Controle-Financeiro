import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ApenasDigitos]'
})
export class ApenasDigitosDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') validarInput() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z0-9']/g, '');
  }

}
