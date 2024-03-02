import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../header/header.module';
import { BrandsComponent } from '../brands/brands.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '../footer/footer.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { BannerModule } from './banner/banner.module';
import { SectionMainComponent } from './section-main/section-main.component';
import { RecomendationPhonePageComponent } from './recomendation/recomendation-phone-page/recomendation-phone-page.component';
import { RecomendationLaptopPageComponent } from './recomendation/recomendation-laptop-page/recomendation-laptop-page.component';
import { RecomendationRandomMobilePageComponent } from './recomendation/recomendation-random-mobile-page/recomendation-random-mobile-page.component';




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
    BannerModule,
    SectionMainComponent,
    RecomendationPhonePageComponent,
    RecomendationLaptopPageComponent,
    RecomendationRandomMobilePageComponent



  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
