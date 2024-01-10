import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { TokenService } from '../servise/token.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user:User
  constructor(private tokenService: TokenService,
    private authService: AuthService) {

  }


  ngOnInit(): void {

    this.tokenService.postUserDataWithToken().subscribe((user: User)=> {
      this.user = user
      console.log(this.user);
    })




  }

  logOut() {
    this.tokenService.clearAuthToken()
    this.authService.setLoggedInStatus(false)


  }

}



