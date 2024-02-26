import { RecommendationItems } from './../../models/recommendation-items.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApplicationPipesModule } from 'src/app/pipes/products-price/application-pipes.module';
import { ProductService } from 'src/app/servise/product.service';

@Component({
  selector: 'app-recomendation-random-mobile-page',
  standalone: true,
  imports: [CommonModule, ApplicationPipesModule, RouterLink],
  templateUrl: './recomendation-random-mobile-page.component.html',
  styleUrl: './recomendation-random-mobile-page.component.css'
})
export class RecomendationRandomMobilePageComponent implements OnInit {


  randomItems: RecommendationItems[]

  constructor(private productService: ProductService) {}


  ngOnInit(): void {
    this.productService.getAllPhones2().subscribe((items) => {
      this.randomItems = items
    })



  }
}
