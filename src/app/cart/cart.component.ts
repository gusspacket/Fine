import { Product } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from '../models/cart.model';
import { ProductService } from '../servise/product.service';
import { Subject, Subscription } from 'rxjs';

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




  constructor(private cartService: CartService, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.loadCart();

    this.cartService.itemCount$.subscribe(itemCount => {
      this.itemCount = itemCount;
      console.log("itemCount", itemCount);

    });





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
    if (product.quantity > 1) {
      product.quantity--;
      product.price = product.quantity * product.sku.price;
      this.cartService.updateCart(product).subscribe();
      this.loadCart();
      this.cartService.updateItemCartCount()
    } else if (product.quantity === 1) {
      this.deleteFromCart(product);
    }
  }



  plusQuantity(product: Product) {
    product.quantity++
    product.price = product.quantity * product.sku.price;
    this.cartService.updateCart(product).subscribe()

    this.cartService.getTotalCartItem().subscribe(total => {
      this.cartService.updateItemCount(total); // Обновляем значение в стриме
      this.cartService.updateItemCartCount()
    });

    this.loadCart();
  }



}





