import { BrandsService } from './../servise/brands.service';
import { Component, OnInit } from '@angular/core';
import { Brands } from '../models/brands.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: Brands[] = [];

  constructor(private brandsService: BrandsService) {}



  ngOnInit() {
      this.brandsService.getAllBrands().subscribe(brands => {
        this.brands = brands
      })

  }
}
