import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../header/header.module';
import { BrandsComponent } from '../brands/brands.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '../footer/footer.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { BannerModule } from './banner/banner.module';




@NgModule({
  declarations: [
    DashboardComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    ProductReviewModule,
    BannerModule




  ]
})
export class DashboardModule { }
