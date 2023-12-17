import { Pipe, PipeTransform } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';

@Pipe({
  name: 'cartCount',
  pure: false
})
export class HeaderCountPipe implements PipeTransform {

  constructor(private cartService: CartService) {}

  transform(cartItems: any[]): number {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }

    // Используем метод reduce для подсчета суммы sku.price
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  }

}
