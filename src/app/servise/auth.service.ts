import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin } from '../models/auth-login.model.';
import { AuthSmsService } from '../models/auth-sms.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http:HttpClient) { }

  private authUrl = 'http://89.108.114.139/api/user/login/'
  private sendSmsUrl = 'http://89.108.114.139/api/sendsms/'

  checkTokenInLocalStorage(): void {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    this.setLoggedInStatus(isLoggedIn);
    console.log("isLoggedIn?", isLoggedIn);

  }

  setLoggedInStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }


  getLoggedInStatus(): boolean {
    return this.isLoggedInSubject.value;
  }




  sendSmsToServer(phone: AuthSmsService) {
    return this.http.post(this.sendSmsUrl, phone)
  }

  postUserData(authData: AuthLogin) {
    return this.http.post(this.authUrl, authData)
  }


}
