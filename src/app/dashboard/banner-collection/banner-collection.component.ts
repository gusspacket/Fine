import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Banners } from 'src/app/models/banner.model';

@Component({
  selector: 'app-banner-collection',
  standalone: true,
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './banner-collection.component.html',
  styleUrl: './banner-collection.component.css'
})
export class BannerCollectionComponent implements OnInit {


  @Input() banners:Banners[] = [];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  };

  constructor() {}

  ngOnInit(): void {

  }

}
