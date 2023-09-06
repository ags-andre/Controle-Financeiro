import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[ApenasNumber]'
})
export class ApenasNumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') validarNumber() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
  }
}
