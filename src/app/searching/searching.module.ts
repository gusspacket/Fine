import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingComponent } from './searching.component';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SearchingComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HeaderModule,
    FooterModule,
    FormsModule

  ],
  exports: [
    SearchingComponent
  ]
})
export class SearchingModule { }
