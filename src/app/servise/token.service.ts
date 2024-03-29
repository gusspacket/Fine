import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http:HttpClient) { }

  private _token: string; // Переменная для хранения токена
  private tokenUrl = 'http://89.108.114.139/api/user/info/'
  private logOutUrl = 'http://89.108.114.139/api/user/logout/'

   // Получение токена из предыдущего ответа
   getAuthToken(){
    return localStorage.getItem(this._token);
  }



  // Сохранение токена
  setAuthToken(token: string): void {
    this._token = token
    localStorage.setItem("token", this._token);
    console.log(this._token);

  }


  clearAuthToken(): void {
    localStorage.removeItem('token');
  }


  //  Метод для отправки данных с использованием токена в заголовке
  postUserDataWithToken(){

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `token ${token}`
    });
    const options = { headers: headers };
    return this.http.get(this.tokenUrl, options);
  }

  headersWithToken() {

  }



}




