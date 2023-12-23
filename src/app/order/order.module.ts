import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { HeaderModule } from '../header/header.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {NgxMaskModule} from 'ngx-mask'



@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    OrderCartComponent

  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterLink,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskModule.forRoot()




  ]
})
export class OrderModule { }
