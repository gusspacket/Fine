import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isEditingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEditings$: Observable<boolean> = this.isEditingSubject.asObservable();

  public userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  // может что то поменяться, потому что я делаю запрос теперь в начале и кладу туда начальный user




  constructor(private http:HttpClient,
  ) { }

  private userUrl = 'http://89.108.114.139/api/user/info/'
  private userChangheInfoUrl = 'http://89.108.114.139/api/user/change_info/'
  private userChangePhoneUrl = 'http://89.108.114.139/api/user/change_phone/'

  setUserInfo(userInfo: User) {
    this.userSubject.next(userInfo);
  }


  changeUserInfo(data:any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    const options = { headers: headers };

    return this.http.put(this.userChangheInfoUrl,data, options)
  }

  changeUserPhone(data:any): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    const options = { headers: headers };

    return this.http.put(this.userChangePhoneUrl,data, options)
  }


}

