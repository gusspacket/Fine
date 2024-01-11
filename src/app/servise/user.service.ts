import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
  ) { }

  private userUrl = 'http://89.108.114.139/api/user/info/'


  getUserInfo() {
    const token = localStorage.getItem('token')
    console.log(token);

    return this.http.post(this.userUrl, token)
  }





}

