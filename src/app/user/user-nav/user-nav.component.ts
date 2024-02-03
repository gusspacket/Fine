import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servise/auth.service';
import { TokenService } from 'src/app/servise/token.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {

  constructor
  (
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router

  ) {}




  logOut() {
    this.authService.deleteTokenFromServer()
    this.tokenService.clearAuthToken()
    this.authService.setLoggedInStatus(false)
    this.router.navigate(['/']);
    this.authService.isLoggedInSubject.next(false);
  }
}
