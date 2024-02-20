import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/servise/category.service';
import { ProductService } from 'src/app/servise/product.service';

@Component({
  selector: 'app-recomendation-laptop-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recomendation-laptop-page.component.html',
  styleUrl: './recomendation-laptop-page.component.css'
})
export class RecomendationLaptopPageComponent implements OnInit {





 catPhone:any
 laptopRec: Product[]
 recCategory:string = 'noutbuki'

  constructor(private productService: ProductService,
    private categoryService: CategoryService) {

  }


  ngOnInit(): void {
    this.productService.getAllLaptops2().subscribe((laptop) => {
      this.laptopRec = laptop
    })

    this.categoryService.categories$.subscribe((cat) => {
      this.catPhone = cat[0]

    })

  }
}
