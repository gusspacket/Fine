import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/servise/product.service';
import { CartService } from '../cart/cart.service';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { Cart2 } from '../models/cart2.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: number;
  name: string;
  img: string;
  price: string;
  slug: string;
  category: string;
  product: Product;
  productInCart: Cart2;
  productAddedToCart: boolean = false;
  productToAdd: Cart
  selectedProduct: Product

  showFullDescription:boolean = false

  categoryName: string;
  categorySlug:string;







  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {

  }


  ngOnInit() {
    window.scrollTo(0, 0);
     this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
      this.loadProduct();

    });



  }

  loadProduct() {
    this.productService.getProductById(this.id).subscribe(
      (products) => {
        this.product = products[0];
        console.log(this.product);

        this.categoryName = this.product.category.name
      }
    );

  }

  // categoryProduct() {
  //   if (this.productById) {
  //     this.categoryName = this.productById.category.name;
  //     console.log(this.categoryName);

  //     this.categorySlug = this.productById.category.slug;
  //     console.log(this.categorySlug);
  //   }
  // }



  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }



  // loadCategory() {
  //   this.categoryService.getAllCategories().subscribe(() => {
  //     this.route.queryParams.subscribe((params) => {
  //       this.category = params['category'];
  //       this.id = +params['id'];
  //       this.categoryName = this.categoryService.getCategoryNameBySlug(this.category);

  //       if (this.category === 'smarfony') {
  //         this.productService.getPhoneById(this.id).subscribe(product => {
  //           if (product?.sku?.id === this.id) {
  //             this.selectedProduct = product;
  //           }
  //         });
  //       } else if (this.category === 'noutbuki') {
  //         this.productService.getLaptopById(this.id).subscribe(product => {
  //           if (product?.sku?.id === this.id) {
  //             this.selectedProduct = product;
  //           }
  //         });
  //       }
  //     });
  //   })

  // }

  // checkProductInCart() {
  //   this.cartService.isProductInCart(this.id).subscribe((isInCart: boolean) => {
  //     if (isInCart) {
  //       this.productAddedToCart = true
  //       this.cartService.getProductFromCartById(this.id)
  //       .subscribe(
  //       (product: any) => {
  //         this.productInCart = product;
  //       });
  //     } else  {
  //       this.productAddedToCart = false
  //     }
  //   })
  // }



  addToCart(product: Product) {
    // const productToAdd: Cart = {
    //   quantity: 1,
    //   productAddedToCart: true,
    //   id: product.sku.id,
    //   price: product.sku.price,
    //   img: product.sku.img_url,
    //   brand: product.brand,
    //   name: product.name,
    //   sku: product.sku,
    };


    // this.cartService.add(productToAdd).subscribe(()=> {
    //   this.cartService.isProductInCart(this.id).subscribe((isInCart: boolean) => {
    //     if (isInCart) {
    //       this.productAddedToCart = true
    //       this.cartService.getProductFromCartById(this.id)
    //       .subscribe(
    //       (product: any) => {
    //         this.productInCart = product;
    //       });
    //       this.productAddedToCart = true
    //     }
    //   })
    // });



  deleteFromCart(productInCart) {
    // this.cartService.delete(productInCart.id).subscribe(() => {
    // })
  }

  plusQuantity(productInCart) {
    // productInCart.quantity++
    // this.cartService.updateCart(productInCart).subscribe()
  }

  minusQuantity(productInCart) {
    // if (productInCart.quantity > 1) {
    //   productInCart.quantity--;
    // } else if (productInCart.quantity === 1) {
    //   this.deleteFromCart(productInCart);
    //   this.productAddedToCart = false
    // }
  }

  goBack() {
    this.router.navigate(['/products/:category']);
  }

  scrollTo(target: HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" })
  };







    // this.loadCategory()

    // this.checkProductInCart()
}










































