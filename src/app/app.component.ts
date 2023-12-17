import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fine_store';

  constructor(private cartService:CartService) {

  }

  ngOnInit(): void {
    this.cartService.updateItemCartCount()
  }

}
