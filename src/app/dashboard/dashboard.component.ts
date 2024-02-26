import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { TokenService } from '../servise/token.service';
import { UserService } from '../servise/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user:User
  user$

  constructor( private tokenService: TokenService,private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.user$.subscribe((user$) => {
      if(user$) {
       this.user = user$
      }
    })


  }


}
