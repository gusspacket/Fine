import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsPriceFormatPipe'
})
export class ProductsPriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
