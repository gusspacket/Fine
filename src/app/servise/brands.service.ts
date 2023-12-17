import { BaseApi } from './../core/base-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brands } from '../models/brands.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService extends BaseApi {

  constructor(private _http: HttpClient) {
    super(_http)
   }
  brand: Brands[] = [];
  private brandUrl = 'http://89.108.114.139/api/brand/'


  getAllBrands():Observable<Brands[]>  {
    return this.get<Brands[]>('brand/')
  };

}


