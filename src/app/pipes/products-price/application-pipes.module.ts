import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPriceFormatPipe } from './products-price.pipe';
import { SerchProductsPipe } from './products-search.pipe';



@NgModule({
  declarations: [
    ProductsPriceFormatPipe,
    SerchProductsPipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsPriceFormatPipe,
    SerchProductsPipe
  ]
})
export class ApplicationPipesModule { }
