import { Component, OnInit } from '@angular/core';
import { Banners } from 'src/app/models/banner.model';
import { BannerService } from 'src/app/servise/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  banners: Banners[] = [];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    // this.bannerService.getAllBanners().subscribe(banners => {
    //   this.banners = banners
    // })

    this.bannerService.getAllCollectionBanners().subscribe(banners => {
      this.banners = banners
      console.log(this.banners);

    })

  }

}
