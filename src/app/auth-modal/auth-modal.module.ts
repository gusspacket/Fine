import { NgModule } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxMaskModule} from 'ngx-mask'
import { BrowserModule } from '@angular/platform-browser';
import { AuthModalComponent } from './auth-modal.component';




@NgModule({
  declarations: [
    AuthModalComponent

  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FormControl,
    Validators,
    NgxMaskModule.forRoot()

  ]
})
export class AuthModalModule { }
