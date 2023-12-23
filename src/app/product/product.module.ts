import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/header/header.module';
import { FooterModule } from 'src/app/footer/footer.module';
import { ApplicationPipesModule } from '../pipes/products-price/products-price.module';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductCharacteristicsComponent } from './product-characteristics/product-characteristics.component';
import { ProductFeedbackComponent } from './product-feedback/product-feedback.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductDescriptionComponent,
    ProductCharacteristicsComponent,
    ProductFeedbackComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    HeaderModule,
    FooterModule,
    ApplicationPipesModule
  ]
})
export class ProductModule { }
