import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/servise/category.service';

@Component({
  selector: 'app-header-part-bottom',
  templateUrl: './header-part-bottom.component.html',
  styleUrls: ['./header-part-bottom.component.css']
})
export class HeaderPartBottomComponent implements OnInit {

  categories: Categories[] = [];
  visibleCategoriesCount: number;
  isDropdownOpen = false;

  constructor(private categoryService: CategoryService) {}





  ngOnInit() {
   this.categoryService.getAllCategories().subscribe(categories => {
    this.categories = categories
   })

   this.visibleCategoriesCount = 10
  }

  categoryClicked(slug) {
  }


}
