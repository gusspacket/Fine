import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin } from '../models/auth-login.model.';
import { AuthSmsService } from '../models/auth-sms.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthError } from '../models/auth-error.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private authUrl = 'http://89.108.114.139/api/login/'
  private sendSmsUrl = 'http://89.108.114.139/api/sendsms/'



  sendSmsToServer(phone: AuthSmsService) {
    return this.http.post(this.sendSmsUrl, phone)
  }

  postUserData(authData: AuthLogin) {
    return this.http.post(this.authUrl, authData)
  }


}
