import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPriceFormatPipe } from './products-price.pipe';



@NgModule({
  declarations: [
    ProductsPriceFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsPriceFormatPipe
  ]
})
export class ApplicationPipesModule { }
