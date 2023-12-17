import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReviewComponent } from './product-review.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterLink } from '@angular/router';
import { ApplicationPipesModule } from 'src/app/pipes/products-price/products-price.module';



@NgModule({
  declarations: [
    ProductReviewComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterLink,
    ApplicationPipesModule
  ],
  exports: [
    ProductReviewComponent
  ]
})
export class ProductReviewModule { }
