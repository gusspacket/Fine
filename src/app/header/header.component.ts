import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../servise/settings.service';
import { Settings } from '../models/settings.model';
import { CategoryService } from '../servise/category.service';
import { Categories } from '../models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  settings: Settings;
  categoriesAll: Categories[]

  constructor(private settingsService: SettingsService, private categoryService:CategoryService) {}

  ngOnInit(): void {

    this.settingsService.settings.subscribe(settings => {
      this.settings = settings
    })

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categoriesAll = categories
      this.categoryService.categoriesSubject.next(this.categoriesAll);
     })




  }

}{


}
