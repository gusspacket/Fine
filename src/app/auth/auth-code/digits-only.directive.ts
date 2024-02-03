// digits-only.directive.ts
import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitsOnly]',
  standalone: true
})
export class DigitsOnlyDirective {

  constructor(private el: ElementRef) {}



  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '').slice(0, 4); // Ограничиваем до 4 цифр
  }



}


