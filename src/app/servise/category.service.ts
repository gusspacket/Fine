import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from '../models/category.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  {

  constructor(private http: HttpClient) {}

  category: Categories[] = [];


  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('http://89.108.114.139/api/category/')
      .pipe(
        tap((categories) => this.category = categories)
      );
  }



  getCategoryNameBySlug(category: string): string {
    const foundCategory = this.category.find((cat) => cat.slug === category);
    return foundCategory ? foundCategory.name : 'Категория не найдена';
  }





}
