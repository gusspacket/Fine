import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banners } from '../models/banner.model';
import { Collection } from '../models/collection.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
  banners: BannerService[] = [];

  private bannersUrl = 'http://89.108.114.139/api/banners/'
  private bannersCollectionUrl = 'http://89.108.114.139/api/cat_collection/'

  getAllBanners():Observable<Banners[]> {
    return this.http.get<Banners[]>(this.bannersUrl)
  }

  getAllCollectionBanners():Observable<Collection[]> {
    return this.http.get<Collection[]>(this.bannersCollectionUrl)
  }

}
