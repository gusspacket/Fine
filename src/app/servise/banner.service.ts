import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banners } from '../models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
  banners: BannerService[] = [];

  private bannersUrl = 'http://89.108.114.139/api/banners/'

  getAllBanners():Observable<Banners[]> {
    return this.http.get<Banners[]>(this.bannersUrl)
  }

}
