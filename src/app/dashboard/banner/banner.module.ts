import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BannerComponent } from './banner.component';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
