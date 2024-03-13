import { Component, Input, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/servise/category.service';

@Component({
  selector: 'app-header-part-bottom',
  templateUrl: './header-part-bottom.component.html',
  styleUrls: ['./header-part-bottom.component.css']
})
export class HeaderPartBottomComponent implements OnInit {

  categories: Categories[] = [];
  // categories: any
  visibleCategoriesCount: number;
  isDropdownOpen = false;


  constructor(private categoryService: CategoryService) {}




  ngOnInit() {

    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories
    })
   this.visibleCategoriesCount = 10
  }








}
