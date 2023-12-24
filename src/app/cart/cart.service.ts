import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, switchMap, tap, throwError } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Cart2 } from '../models/cart2.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = 'http://localhost:3000/cart';
  cart: Cart[];
  productToAdd: number

  cartDataList: any = []
  productlist = new BehaviorSubject<any>([]);

  private itemCountSubject = new Subject<number>();
  itemCount$ = this.itemCountSubject.asObservable();
  itemCount: number;

  constructor(private http: HttpClient) { }



  add(product:any):Observable<any> {
    return this.http.post('http://localhost:3000/cart', product)
  }

  delete(productId: number): Observable<any> {
    return this.http.delete(`${this.cartUrl}/${productId}`);
  }

  getAll():Observable<any> {
    return this.http.get('http://localhost:3000/cart')
  }

  getTotalCartItem() {
    return this.getAll().pipe(
      map(itemCount => itemCount.reduce((total, item) => total + item.quantity, 0))
    );
  }

  updateItemCount(itemCount: number): void {
    this.itemCountSubject.next(itemCount);
  }

  updateItemCartCount() {
     this.getAll().subscribe(cartItems => {
      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      this.itemCountSubject.next(totalCount);
    });
  }



  isProductInCart(productId: number): Observable<boolean> {
    return this.getAll().pipe(
      map((cartItems: any[]) => {
        return cartItems.some(item => item.id === productId);
      })
    );
  }

  updateCart(product: Product): Observable<any> {
    const url = `${this.cartUrl}/${product.id}`;
    return this.http.put(url, product);
  }

  updateQuantityById(productId: number): Observable<any> {
    const url = `${this.cartUrl}/${productId}`;
    return this.getAll().pipe(
      switchMap((cartItems) => {
        const updatedCart = [...cartItems]; // Создаем копию корзины

        // Ищем продукт в корзине
        const existingProductIndex = updatedCart.findIndex((item) => item.id === productId);

        if (existingProductIndex !== -1) {
          // Найденный продукт, увеличиваем quantity
          updatedCart[existingProductIndex].quantity = (updatedCart[existingProductIndex].quantity || 0) + 1;
          // Отправляем обновленное поле quantity на сервер
          return this.http.patch(url, { quantity: updatedCart[existingProductIndex].quantity })
        } else {
          // Продукта нет в корзине, обработайте это по вашему усмотрению
          return throwError('Product not found in cart');
        }
      })
    );
  }



  getProductFromCartById(productId: number): Observable<any> {
    return this.getAll().pipe(
      map((cartItems: any[]) => {
        const foundItem = cartItems.find(item => item.id === productId);
        return foundItem || null; // Возвращаем найденный продукт или null, если продукт не найден
      })
    );
  }


  //СЕРВЕР ИЛЬГИЗА

  // add2(product: Cart2, sessionId: string): Observable<any> {
  //   const url = `http://89.108.114.139/api/cart/add/?sessionId=${sessionId}`;
  //   return this.http.post(url, product);
  // }

  add2(product: Cart2, sessionId: string): Observable<any> {
    const url = `http://89.108.114.139/api/cart/add/`;
    return this.http.post(url, product);
  }

  getAll2():Observable<any> {

    return this.http.get('http://89.108.114.139/api/cart/')
  }


  // getAll2(): Observable<any> {
  //   return this.http.get('http://89.108.114.139/api/cart/').pipe(
  //     map((response: any) => {
  //       console.log('Response:', response);
  //       return response; // You can return the response if needed
  //     })
  //   );
  // }

  // getAll2(): Observable<any> {
  //   const options = {
  //     observe: 'response' as const, // observe the full response
  //   };

  //   return this.http.get('http://89.108.114.139/api/cart/', options).pipe(
  //     map(response => {
  //       // Accessing headers from the response
  //       const headers: HttpHeaders = response.headers;
  //       const setCookieHeader: string | null = headers.get('Set-Cookie');

  //       console.log('Set-Cookie Header:', setCookieHeader);

  //       // Returning the response body
  //       return response.body;
  //     })
  //   );
  // }





}







