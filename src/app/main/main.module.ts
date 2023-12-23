import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderModule } from '../header/header.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FooterModule } from '../footer/footer.module';
import { ProductsModule } from '../products/products.module';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { AppRoutingModule } from '../app-routing.module';





@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    DashboardModule,
    FooterModule,
    MainRoutingModule,
    AppRoutingModule,
    RouterLink
  ],
  exports: [RouterModule]
})
export class MainModule { }
