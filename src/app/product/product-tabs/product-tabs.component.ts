import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.css']
})
export class ProductTabsComponent implements OnInit {


  @Input()
  product: Product

  @Input() activateCharacteristics: Function;

  showDescription:boolean = false;
  showCharacteristics:boolean = true;
  showFeedback:boolean = false;
  isDescriptionActive:boolean = false;
  isCharacteristicsActive:boolean = true;
  isDFeedbackActive:boolean = false;
  showAllCharacteristics:boolean = false

  delimiter: string = Array(300).fill('&#183;').join('');




  ngOnInit(){

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
