import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from 'src/app/product/product.component';
import { SearchingComponent } from './searching/searching.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'products/:category', component: ProductsComponent},
  {path: 'product', component: ProductComponent},
  {path: 'search', component: SearchingComponent},
  {path: 'cart', component: CartComponent}










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


