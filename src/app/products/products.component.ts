import { ApplicationModule, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../servise/product.service';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../models/product.model';
import { Categories } from '../models/category.model';
import { Observable } from 'rxjs';
import { Cart2 } from '../models/cart2.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule,ApplicationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  category: string;
  products: Product[];
  laptops: Product[];
  categoryProduct: Product;
  isLoader = false;
  categoryName: string;
  categorySlug:string;
  categories$: Observable<Categories[]>
  searchTerm =  '';

  cartData: any
  expiresDate: Date;

  searchString = '';
  isSamsungSelected: boolean = false;
  isAppleSelected: boolean = false;
  filteredProducts: Product[] = [];



  selectAll = false;



  tempArray:any= []
  newArray:any = []
  arrays:any = []
  originalProducts = []
  brands = []


  // FILTER
  selectedBrands: { [key: string]: boolean } = {};
  uniquePhoneBrands: { id: number; name: string }[] = [];
  minPrice: any;
  maxPrice: any;
  uniqueProductsColors: { id: number; name: string }[] = [];
  foundCharacteristic: {}[] = []



  // PAGINATOR
  pageSlice: Product[]
  lengthProducts: number


  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor
  ( private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute

   ) {}


ngOnInit() {

  this.route.queryParams.subscribe((params) => {
    this.category = params['category'];
    console.log(this.category);

    this.loadProducts();



  });
}


loadProducts() {
  this.productService.getProductsByCategory(this.category).subscribe((products) => {
    this.products = products
    this.originalProducts = [... products]
    this.categoryName = this.products[0].category.name
    this.categorySlug = this.products[0].category.slug
    this.itemsProductsBrands()
    this.minPrice = this.getMinPrice();
    this.maxPrice = this.getMaxPrice();
    this.lengthProducts = this.products.length;
  })

}




// PAGINATOR

// onPageChange(event: PageEvent) {
//   console.log(event);

//   const startIndex = event.pageIndex * event.pageSize;
//   let endIndex = startIndex + event.pageSize;
//   if (endIndex > this.originalProducts.length) {
//     endIndex = this.originalProducts.length;
//   }

//   // Обновление this.pageSlice для использования в шаблоне
//   this.pageSlice = this.originalProducts.slice(startIndex, endIndex);

//   // Обновление this.products на основе this.pageSlice
//   this.products = this.pageSlice;

//   console.log(this.products);

//   // Обновление значения lengthProducts после изменения this.products
//   this.lengthProducts = this.originalProducts.length;
// }





// FILTER

searchColor() {

}



itemsProductsBrands() {
  const uniqueBrandsMap: { [key: string]: any } = {};

  // Проходим по товарам и добавляем уникальные бренды в объект
  this.products.forEach(product => {
    const brandId = product.brand.id;
    const brandName = product.brand.name;

    // Если бренда еще нет в объекте, добавляем его
    if (!uniqueBrandsMap[brandName]) {
      uniqueBrandsMap[brandName] = { id: brandId, name: brandName };
    }
  });
  // Преобразуем объект в массив уникальных брендов
  this.uniquePhoneBrands = Object.values(uniqueBrandsMap);

}







onChangeBrand(event: any, brandName: string) {
  if (event.target.checked) {
    this.tempArray = this.products.filter((e: any) => e.brand.id == event.target.value);
    this.newArray.push(...this.tempArray);
  } else {
    // Если флажок снят, фильтруем только те элементы, которые не соответствуют снятому флажку
    this.newArray = this.newArray.filter((e: any) => e.brand.id != event.target.value);
  }

  // Если есть выбранные бренды, применяем фильтр, иначе возвращаем весь исходный массив
  this.products = this.newArray.length > 0 ? [...this.newArray] : [...this.originalProducts];
}

onChangeColor(event: any) {
  if (event.target.checked) {
    console.log(event.target.checked);

    this.tempArray = this.products.filter((e: any) => e.characteristic.value == event.target.checked);
    this.newArray.push(...this.tempArray);
  } else {
    // Если флажок снят, фильтруем только те элементы, которые не соответствуют снятому флажку
    this.newArray = this.newArray.filter((e: any) => e.characteristic.value != event.target.value);
  }

  // Если есть выбранные бренды, применяем фильтр, иначе возвращаем весь исходный массив
  this.products = this.newArray.length > 0 ? [...this.newArray] : [...this.originalProducts];
}





filterProductsPrice() {
  this.products = this.originalProducts.filter(product => {
    const price = product.price;

    if ((this.minPrice === null || price >= this.minPrice) &&
        (this.maxPrice === null || price <= this.maxPrice)) {
      return true;
    }

    return false;
  });
}

getMinPrice(): number {
  if (this.products.length === 0) {
    return null;
  }
  return Math.min(...this.originalProducts.map(product => product.price));
}



getMaxPrice(): number {
  if (this.originalProducts.length === 0) {
    return null;
  }
  return Math.max(...this.originalProducts.map(product => product.price));
}


onEnter(event: KeyboardEvent): void {
  if (event.key === 'Enter' && this.minPrice !== null && this.maxPrice !== null) {
    this.filterProductsPrice();
  }
}


resetFilters() {
  window.scrollTo(0, 0);
  this.selectedBrands = {};
  this.products = [...this.originalProducts];
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







