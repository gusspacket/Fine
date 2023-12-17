import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { ProductModule } from 'src/app/product/product.module';
import { HeaderModule } from './header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchingModule } from './searching/searching.module';
import { ApplicationPipesModule } from './pipes/products-price/products-price.module';
import { CartService } from './cart/cart.service';




@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    HeaderModule,
    ProductsModule,
    ProductModule,
    OrderModule,
    CartModule,
    ApplicationPipesModule,
    SearchingModule,
  ],



  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
