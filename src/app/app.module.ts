import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from './order/order.module';
import { ProductModule } from 'src/app/product/product.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchingModule } from './searching/searching.module';
import { ApplicationPipesModule } from './pipes/products-price/application-pipes.module';
import { MainModule } from './main/main.module';
import { MatTooltipModule } from '@angular/material/tooltip';




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
    ProductModule,
    OrderModule,
    ApplicationPipesModule,
    SearchingModule,
    MainModule,
    MatTooltipModule

  ],



  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
