import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { RecommendationItems } from 'src/app/models/recommendation-items.model';
import { ApplicationPipesModule } from 'src/app/pipes/products-price/application-pipes.module';
import { CategoryService } from 'src/app/servise/category.service';
import { ProductService } from 'src/app/servise/product.service';
import { RandomProductsService } from 'src/app/servise/random-products.service.';

@Component({
  selector: 'app-recomendation-laptop-page',
  standalone: true,
  imports: [RouterModule, CommonModule, ApplicationPipesModule],
  templateUrl: './recomendation-laptop-page.component.html',
  styleUrl: './recomendation-laptop-page.component.css'
})
export class RecomendationLaptopPageComponent implements OnInit {





 catPhone:any
 laptopRec: RecommendationItems[]
 recCategory:string = 'noutbuki'
 countRandomLaptop:number = 12;

  constructor(
    private categoryService: CategoryService,
    private randomProductsServiceService: RandomProductsService ) {

  }


  ngOnInit(): void {
    this.randomProductsServiceService.getRandomLaptops(this.countRandomLaptop)
    .subscribe((laptop)=> {
      this.laptopRec = laptop
    })

    this.categoryService.categories$.subscribe((cat) => {
      this.catPhone = cat[1]
    })

  }
}
