import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banners } from '../models/banner.model';
import { Collection } from '../models/collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  collection: Collection[]

  private collectionUrl = 'http://89.108.114.139/api/cat_collection/'

  getAllCollections():any{
   return this.http.get<Collection[]>(this.collectionUrl)
  }

}
