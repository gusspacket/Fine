import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from 'src/app/product/product.component';
import { SearchingComponent } from './searching/searching.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


