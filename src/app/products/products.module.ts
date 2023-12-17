import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterModule } from '../footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ApplicationPipesModule } from '../pipes/products-price/products-price.module';




@NgModule({
  declarations: [
    ProductsComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    MatPaginatorModule,
    MatTableModule,
    ApplicationPipesModule


  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
