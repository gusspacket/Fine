import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/header/header.module';
import { FooterModule } from 'src/app/footer/footer.module';
import { ApplicationPipesModule } from '../pipes/products-price/products-price.module';



@NgModule({
  declarations: [
    ProductComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    ApplicationPipesModule
  ]
})
export class ProductModule { }
