import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi {

  private baseUrl = 'http://89.108.114.139/api/'

  constructor(public http: HttpClient) { }



  get<T>(text:string):Observable<T> {
    return this.http.get<T>(this.baseUrl + text)
  }


}

