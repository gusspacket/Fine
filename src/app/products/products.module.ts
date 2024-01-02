import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { HeaderModule } from '../header/header.module';
import { RouterLink, RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationPipesModule } from '../pipes/products-price/application-pipes.module';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';





@NgModule({
  declarations: [
    ProductsComponent,
    ProductsFilterComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    ApplicationPipesModule,
    MatPaginatorModule



  ],
  exports: [

  ]
})
export class ProductsModule { }
