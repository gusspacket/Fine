import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderPartTopComponent } from './components/header-part-top/header-part-top.component';
import { HeaderPartMainComponent } from './components/header-part-main/header-part-main.component';
import { HeaderPartBottomComponent } from './components/header-part-bottom/header-part-bottom.component';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderCountPipe } from './pipes/count-header.pipe';
import { ProductsComponent } from '../products/products.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';





@NgModule({
  declarations: [
    HeaderComponent,
    HeaderPartTopComponent,
    HeaderPartMainComponent,
    HeaderPartBottomComponent,
    HeaderCountPipe

  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,

  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
