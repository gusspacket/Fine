import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]',
  standalone: true
})
export class LettersOnlyDirective {

  constructor(private el: ElementRef) {}



  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target.value;
    // event.target.value = input.replace(/[^a-zA-Zа-яА-Я]/g, '');
    event.target.value = input.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
  }


}


