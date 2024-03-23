import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/servise/product.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/servise/category.service';
import { RandomProductsService } from 'src/app/servise/random-products.service.';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.css']
})
export class ProductTabsComponent implements OnInit {


  constructor(private productService: ProductService, private categoryService: CategoryService,
    private ramdomProductsService: RandomProductsService) {

  }

  @Input() product: Product
  @Input() categoryName: string

  @Input() activateCharacteristics: Function;

  showDescription:boolean = true;
  showCharacteristics:boolean = false;
  showFeedback:boolean = false;
  isDescriptionActive:boolean = true;
  isCharacteristicsActive:boolean = false;
  isDFeedbackActive:boolean = false;
  showAllCharacteristics:boolean = false
  category: any;
  productsSameCategory:any
  countItems = 3


  ngOnInit(){

    this.categoryService.categoryName$.subscribe((res) => {
      this.category = res

      this.ramdomProductsService.getRandomProdutsByCategory(this.category, this.countItems).subscribe((products) => {
        this.productsSameCategory = products
      })
    })





}





  productShowDescription() {
    this.showDescription = true;
    this.isDescriptionActive = true
    this.showCharacteristics = false;
    this.showFeedback = false;
    this.isCharacteristicsActive = false
    this.isDFeedbackActive = false
  }


  productShowCharacteristics() {
    this.showCharacteristics = true;
    this.showDescription = false;
    this.showFeedback = false;
    this.isCharacteristicsActive = true
    this.isDescriptionActive = false
    this.isDFeedbackActive = false


  }

  productShowFeedback() {
    this.showCharacteristics = false;
    this.showDescription = false;
    this.showFeedback = true;
    this.isDFeedbackActive = true
    this.isDescriptionActive = false
    this.isCharacteristicsActive = false
  }


  showFeedbackForm() {

  }




}
