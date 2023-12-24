import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalCartPrice'
})


export class CartPricePipe implements PipeTransform {
  transform(cartItems: any[]): number {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }

    // Используем метод reduce для подсчета суммы sku.price
    return cartItems.reduce((total, cartItem) => total + cartItem.price, 0);

  }
}


