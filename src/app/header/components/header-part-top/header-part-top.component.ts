import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Settings } from 'src/app/models/settings.model';

@Component({
  selector: 'app-header-part-top',
  templateUrl: './header-part-top.component.html',
  styleUrls: ['./header-part-top.component.css']
})
export class HeaderPartTopComponent  implements OnInit {

  @Input()
  settings: Settings;

  constructor(
    private cartService: CartService){}

  ngOnInit() {



  }

  postToCart() {
    this.cartService.add2
  }
}
