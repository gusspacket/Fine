import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductsComponent } from '../products/products.component';
import { CartComponent } from '../cart/cart.component';
import { SearchingComponent } from '../searching/searching.component';
import { ProductComponent } from '../product/product.component';


const routes: Routes = [

  {path: '', component: MainComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product', component: ProductComponent},
    {path: 'cart', component: CartComponent},
    {path: 'search', component: SearchingComponent},


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
