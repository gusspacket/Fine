import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collection } from '../models/collection.model';
import { RecommendationItems } from '../models/recommendation-items.model';

@Injectable({
  providedIn: 'root'
})
export class RandomProductsService {

  constructor(private http: HttpClient) { }

  randomProducts: RecommendationItems[]

  private randomProductsUrl = 'http://89.108.114.139/api/products/recommended?category=all&count='
  private randomLaptopUrl = 'http://89.108.114.139/api/products/recommended?category=noutbuki&count='
  private randomPhonesUrl = 'http://89.108.114.139/api/products/recommended?category=smarfony&count='

  // /api/products/recommended?count=5&category=smarfony

  getRandomProducts(count:number):any {
    return this.http.get<RecommendationItems[]>(`${this.randomProductsUrl}${count}`)
  }

  getRandomLaptops(count:number):any {
    return this.http.get<RecommendationItems[]>(`${this.randomLaptopUrl}${count}`)
  }

  getRandomPhones(count:number):any {
    return this.http.get<RecommendationItems[]>(`${this.randomPhonesUrl}${count}`)
  }
}
