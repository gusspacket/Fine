import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { SettingsService } from './servise/settings.service';
import { TokenService } from './servise/token.service';
import { AuthService } from './servise/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fine_store';

  constructor(private cartService:CartService,
    private settingsService: SettingsService,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.checkTokenInLocalStorage()
    this.cartService.updateItemCartCount()
    this.settingsService.getAllSettings().subscribe()


  }

}
