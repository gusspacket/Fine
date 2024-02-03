// digits-only.directive.ts
import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[]',
  standalone: true
})
export class DigitsUserDirective {

  constructor(private el: ElementRef) {}



  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '').slice(0, 11); // Ограничиваем до 4 цифр
  }



}


