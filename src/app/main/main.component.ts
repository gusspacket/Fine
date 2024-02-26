import { Component, OnInit } from '@angular/core';
import { TokenService } from '../servise/token.service';
import { User } from '../models/user.model';
import { UserService } from '../servise/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user:User

  constructor(
    private tokenService: TokenService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
     this.tokenService.postUserDataWithToken().subscribe((userData: User) => {
        this.user = userData
        this.userService.userSubject.next(userData)

      })


  }

}
