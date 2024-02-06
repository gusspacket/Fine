import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart.component';
import { HeaderModule } from '../header/header.module';
import { RouterLink } from '@angular/router';
import { CartPricePipe } from './pipes/total-price-cart.pipe';
import { FooterModule } from '../footer/footer.module';
import { ApplicationPipesModule } from '../pipes/products-price/application-pipes.module';
import { CookieService } from 'ngx-cookie-service';




@NgModule({
  declarations: [
    CartComponent,
    CartPricePipe

  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterLink,
    FooterModule,
    ApplicationPipesModule
  ],
  exports: [

  ],
  providers:[CookieService]
})
export class CartModule { }
