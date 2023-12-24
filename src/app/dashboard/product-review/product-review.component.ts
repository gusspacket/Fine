import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/servise/product.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']

})
export class ProductReviewComponent implements OnInit {


  phones: Product[] = [];
  laptops: Product[] = [];

  slideConfigPhone = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite" : true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ],
  };

  slideConfigLaptop = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite" : true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ],
  };

  constructor(
    private productService: ProductService
    ) {}

  ngOnInit() {

    this.productService.getAllPhones2().subscribe(phones => {
      this.phones = phones;
    });

    this.productService.getAllLaptops2().subscribe(laptops => {
      this.laptops = laptops;
    });




  }
  }


