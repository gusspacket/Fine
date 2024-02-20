import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin } from '../models/auth-login.model.';
import { AuthSmsModel } from '../models/auth-sms.model';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  public phoneInputSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  phoneInput$: Observable<boolean> = this.phoneInputSubject.asObservable();

  userName:string = ''

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  private logInUrl = 'http://89.108.114.139/api/user/login_or_register/'
  private logOutUrl = 'http://89.108.114.139/api/user/logout/'
  private sendSmsUrl = 'http://89.108.114.139/api/sendsms/'



  // checkTokenInLocalStorage(): void {
  //   const token = localStorage.getItem('token');
  //   const isLoggedIn = !!token;
  //   this.setLoggedInStatus(isLoggedIn);
  //   console.log("isLoggedIn?", isLoggedIn);

  // }


  checkTokenInLocalStorage(): boolean {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    this.setLoggedInStatus(isLoggedIn);

    console.log("isLoggedIn?", isLoggedIn);
    return isLoggedIn;
}




  setLoggedInStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  checkBrowserTokenWithServer() {
    const isLoggedIn = this.checkTokenInLocalStorage();

    if (isLoggedIn) {
        return this.tokenService.postUserDataWithToken()
            .pipe(
                catchError((error: any) => {
                    if (error) {
                        console.log('Токен не совпадает с сервером');
                        this.tokenService.clearAuthToken();
                        this.setLoggedInStatus(false);
                    }
                    return of(false); // Возвращаем Observable с значением false в случае ошибки.
                })
            );
    } else {
        return of(false); // Возвращаем Observable с значением false, если токен отсутствует.
    }
}




  getLoggedInStatus(): boolean {
    return this.isLoggedInSubject.value;
  }




  sendSmsToServer(phone: AuthSmsModel) {
    return this.http.post(this.sendSmsUrl, phone)
  }



  postUserData(authData: AuthLogin) {
    return this.http.post(this.logInUrl, authData)
  }

  deleteTokenFromServer() {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: `token ${token}`
    });
    const options = { headers: headers };
    return this.http.get(this.logOutUrl, options).subscribe(response => {
    });
  }

  setUserName(userName: any) {
    this.userName = userName;
  }




}
