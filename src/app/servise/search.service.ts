
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})


export class SearchService {

  constructor(private http: HttpClient) {}

  searchUrl = 'http://89.108.114.139/api/product/?search='


  getAllProducts(searchTerm: string):Observable<Product[]> {
    const fullUrl = `${this.searchUrl}${searchTerm}`;
    return this.http.get<Product[]>(fullUrl);
  }





}
