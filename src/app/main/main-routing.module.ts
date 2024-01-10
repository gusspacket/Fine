import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CartComponent } from '../cart/cart.component';
import { SearchingComponent } from '../searching/searching.component';
import { ProductComponent } from '../product/product.component';
import { OrderComponent } from '../order/order.component';
import { UserComponent } from '../user/user.component';
import { ProductsComponent } from '../products/products.component';


const routes: Routes = [

  {path: '', component: MainComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'products/:category', component: ProductsComponent},
    {path: 'product', component: ProductComponent},
    {path: 'cart', component: CartComponent},
    {path: 'search', component: SearchingComponent},
    {path: 'order', component: OrderComponent},
    {path: 'user', component: UserComponent}

  ]}











];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainRoutingModule { }
