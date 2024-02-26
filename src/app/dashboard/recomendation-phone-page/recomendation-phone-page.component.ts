import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ApplicationPipesModule } from 'src/app/pipes/products-price/application-pipes.module';
import { CategoryService } from 'src/app/servise/category.service';
import { ProductService } from 'src/app/servise/product.service';

@Component({
  selector: 'app-recomendation-phone-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ApplicationPipesModule],
  templateUrl: './recomendation-phone-page.component.html',
  styleUrl: './recomendation-phone-page.component.css'
})
export class RecomendationPhonePageComponent implements OnInit{


 catPhone:any
 phoneRec: Product[]
 recCategory:string = 'smarfony'

  constructor(private productService: ProductService,
    private categoryService: CategoryService) {

  }


  ngOnInit(): void {
    this.productService.getAllPhones2().subscribe((phone) => {
      this.phoneRec = phone
    })

    this.categoryService.categories$.subscribe((cat) => {
      this.catPhone = cat[0]
    })

  }



}
