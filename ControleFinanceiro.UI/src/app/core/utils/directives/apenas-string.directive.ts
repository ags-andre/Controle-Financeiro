import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ApenasString]'
})
export class ApenasStringDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') validarString() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ']/g, '');
  }
}
