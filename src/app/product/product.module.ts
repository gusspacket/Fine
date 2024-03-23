import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderModule } from 'src/app/header/header.module';
import { FooterModule } from 'src/app/footer/footer.module';
import { ApplicationPipesModule } from '../pipes/products-price/application-pipes.module';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { RecomendationRandomMobilePageComponent } from '../dashboard/recomendation/recomendation-random-mobile-page/recomendation-random-mobile-page.component';




@NgModule({
  declarations: [
    ProductComponent,
    ProductTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    HeaderModule,
    FooterModule,
    ApplicationPipesModule,
    RecomendationRandomMobilePageComponent
  ]
})
export class ProductModule { }
