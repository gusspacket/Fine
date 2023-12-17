import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { HeaderModule } from '../header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';




@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    OrderCartComponent

  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterLink



  ]
})
export class OrderModule { }
