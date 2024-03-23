import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from '../models/cart.model';
import { ProductService } from '../servise/product.service';
import { Subject, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RandomProductsService } from '../servise/random-products.service.';
import { RecommendationItems } from '../models/recommendation-items.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productsCart: Product[] = [];
  productToAdd: Cart
  products: any = []
  totalItem: number;
  itemCountSubscription: Subscription
  itemCount:number

  cartItems: RecommendationItems[];

  countRandomProducts:number = 3;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private cookie: CookieService,
    private http: HttpClient,
    private randomProductsServiceService: RandomProductsService) {

  }

  ngOnInit(): void {

    this.randomProductsServiceService.getRandomProducts(this.countRandomProducts)
    .subscribe((items)=> {
      this.cartItems = items
    })





    this.loadCart();

    this.cartService.itemCount$.subscribe(itemCount => {
      this.itemCount = itemCount;
      console.log("itemCount", itemCount);
    });









  }

  setCookie() {

    this.cookie.set("userId", "admiuser")
  }

  getCookie() {
    console.log(this.cookie.get("userId"));

  }

  getSessionId() {

    // const headers = new HttpHeaders({
    //   'Set-Cookie': `token=${token}`
    // });


    this.http.get('http://89.108.114.139/api/cart/',{ withCredentials: true})
    .subscribe(response => {

     console.log(response);

    });

    // this.http.get('http://89.108.114.139/api/cart/', { observe: 'response' })
    // .subscribe(response => {
    //   const cookies = response.headers.getAll('Set-Cookie');
    //   console.log(cookies);
    // })




    //  this.http.get('http://89.108.114.139/api/cart/')
    // .subscribe(response => {
    //   // const setCookieHeader = response.headers.get('Set-Cookie');
    //   console.log(response)
    // })


    // this.http.get('http://89.108.114.139/api/cart/', {observe: 'response' })
    // .subscribe(response => {
    //   // const setCookieHeader = response.headers.get('Set-Cookie');
    //   console.log(response)
    // })


    // this.http.get('http://89.108.114.139/api/cart/', {observe: 'response' })
    // .subscribe(response => {
    //   const sessionId = response.headers.get('Set-Cookie');
    //   if (sessionId) {
    //     console.log('Session ID:', sessionId);
    //   } else {
    //     console.log('Session ID not found in response headers.');
    //   }
    // });

  }






  loadCart() {
    this.cartService.getAll().subscribe(products => {
      if (products && products.length > 0) {
        this.productToAdd = products[products.length - 1];
      }
        this.productsCart = products;

    });
  }

  deleteFromCart(product: Product) {
    this.cartService.delete(product.id).subscribe(() => {
      this.loadCart(); // Обновляем корзину после удаления
      this.cartService.updateItemCartCount()
    });
  }

  minusQuantity(product: Product) {
    // if (product.quantity > 1) {
    //   product.quantity--;
    //   product.price = product.quantity * product.sku.price;
    //   this.cartService.updateCart(product).subscribe();
    //   this.loadCart();
    //   this.cartService.updateItemCartCount()
    // } else if (product.quantity === 1) {
    //   this.deleteFromCart(product);
    // }
  }



  plusQuantity(product: Product) {
    // product.quantity++
    // product.price = product.quantity * product.sku.price;
    // this.cartService.updateCart(product).subscribe()

    // this.cartService.getTotalCartItem().subscribe(total => {
    //   this.cartService.updateItemCount(total); // Обновляем значение в стриме
    //   this.cartService.updateItemCartCount()
    // });

    // this.loadCart();
  }



}





