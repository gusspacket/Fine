import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/servise/settings.service';

@Component({
  selector: 'app-header-part-top',
  templateUrl: './header-part-top.component.html',
  styleUrls: ['./header-part-top.component.css']
})
export class HeaderPartTopComponent  implements OnInit {

  @Input()
  settings: Settings;

  constructor(private settingsService: SettingsService,
    private cartService: CartService){}

  ngOnInit() {
    this.settingsService.getAllSettings().subscribe(settings => {
      this.settings = settings
    })



  }

  postToCart() {
    this.cartService.add2
  }
}
