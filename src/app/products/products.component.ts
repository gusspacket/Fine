import { Cart } from './../models/cart.model';
import { Categories } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/servise/category.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../servise/product.service';
import { Product } from '../models/product.model';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Cart2 } from '../models/cart2.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product2 } from '../models/product2.model';





@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})



export class ProductsComponent implements OnInit {

  category: string;
  products: Product2[];
  laptops: Product[];
  categoryProduct: Product;
  isLoader = false;
  currentPage = 0
  categoryName: string;
  categorySlug:string;
  categories$: Observable<Categories[]>
  searchTerm =  '';

  cartData: any
  expiresDate: Date;




  constructor
  ( private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private http: HttpClient

  ) {}


ngOnInit() {


  this.route.queryParams.subscribe((params) => {
    this.category = params['category'];
    this.loadProducts();
  });





}

loadProducts() {
  this.productService.getProductsByCategory(this.category).subscribe((products) => {
    this.products = products
    this.categoryName = this.products[0].category.name
    this.categorySlug = this.products[0].category.slug
    console.log(this.products);
  })
}



  // addToCart(product: Product2) {
  //   const productToAdd: Car = {
  //     quantity: 1,
  //     productAddedToCart: true,
  //     id: product.id,
  //     price: product.price,
  //     img: product.img_url,
  //     brand: product.brand,
  //     name: product.name,
  //     sku: product.sku
  //   };

  //   this.cartService.isProductInCart(productToAdd.id).subscribe((isInCart: boolean) => {
  //     if (isInCart) {
  //       // Продукт уже в корзине, увеличиваем quantity
  //       this.cartService.updateQuantityById(productToAdd.id).subscribe(()=> {
  //         this.cartService.updateCart
  //         product.productAddedToCart = true
  //         this.cartService.updateItemCartCount()

  //       });
  //     } else {
  //       // Продукта нет в корзине, добавляем его
  //       this.cartService.add(productToAdd).subscribe();
  //       product.productAddedToCart   = true
  //     }
  //   });
  // }


//*********************************************************** */


  postToCart() {

    const productToAdd: Cart2 = {
      product_sku_id: 22  ,
      quantity: 6,

    };


    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('sessionId', sessionId);


    }

    console.log('sessionId', sessionId);

    const url = `http://89.108.114.139/api/cart/add/?sessionId=${sessionId}`;



    this.cartService.add2(productToAdd, sessionId).subscribe(response => {
      // Обработка ответа, если необходимо
      console.log(response);
    });
  }

  postToCart2(product:any) {

    const productToAdd: Cart2 = {
      product_sku_id: 14  ,
      quantity: 5,

    };


    let sessionId = localStorage.getItem('sessionId');
    console.log("sessionId!!!!", sessionId);


    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('sessionId', sessionId);


    }

    console.log('sessionId', sessionId);

    // const url = `http://89.108.114.139/api/cart/add/?sessionId=${sessionId}`;



    this.cartService.add2(productToAdd, sessionId).subscribe(response => {
      const headers = response.headers;
      const sessionId = headers.get('Set-Cookie').split(';')[0].split('=')[1];
      console.log(sessionId);
      console.log(response);
    });





  }


  generateSessionId(): string {
    // Генерация уникального идентификатора, например, с использованием временных меток
    return new Date().getTime().toString();
  }


  getFromCart() {
    this.cartService.getAll2().subscribe(
      response => {
        this.cartData = response;
        console.log(this.cartData);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }




}



// как я получал категорию и искал по всем телефонам

 // this.categoryService.getAllCategories().subscribe(() => {
  //   this.route.queryParams.subscribe((params) => {
  //     // Обновление значения категории
  //     this.category = params['category'];

  //   this.categoryName = this.categoryService.getCategoryNameBySlug(this.category);
  //   // Загрузка продуктов в соответствии с новой категорией
  //   if (this.category === 'smarfony') {
  //     this.productService.getAllPhones().subscribe(phones => {
  //       this.products = phones
  //       phones.forEach((phone: Product) => {
  //         let productAddedToCart: boolean;

  //         this.cartService.isProductInCart(phone.sku.id).subscribe((isInCart: boolean) => {

  //           const product:Product = this.products.find(p => p.sku.id === phone.sku.id)
  //           product.productAddedToCart = isInCart
  //         });
  //       });
  //     });
  //   }

  //   else if (this.category === 'noutbuki') {
  //     this.productService.getAllLaptops().pipe(
  //       switchMap((laptops: Product[]) => {
  //         const isInCartObservables = laptops.map((laptop: Product) =>
  //           this.cartService.isProductInCart(laptop.sku.id).pipe(
  //             map((isInCart: boolean) => ({ laptop, isInCart }))
  //           )
  //         );

  //         return forkJoin(isInCartObservables);
  //       })
  //     ).subscribe((results: { laptop: Product, isInCart: boolean }[]) => {
  //       this.products = results.map(result => {
  //         const product: Product = result.laptop;
  //         product.productAddedToCart = result.isInCart;
  //         return product;
  //       });
  //     });
  //   } else {
  //     this.productService.getAllPhones().subscribe(products => {
  //       this.products = products;
  //     });
  //   }
  // });
  // })



