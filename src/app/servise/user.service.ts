import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
  ) { }

  private userUrl = 'http://89.108.114.139/api/user/info/'
  private userChangheInfoUrl = 'http://89.108.114.139/api/user/change_info/'


  getUserInfo() {
    const token = localStorage.getItem('token')
    return this.http.post(this.userUrl, token)
  }

  changeUserInfo(user:User): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });
    const options = { headers: headers };
    console.log(options);
    console.log(user);


    return this.http.put(this.userChangheInfoUrl,user, options)
  }


}

