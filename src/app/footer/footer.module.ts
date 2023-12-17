import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { FooterDownComponent } from './footer-down/footer-down.component';



@NgModule({
  declarations: [
    FooterComponent,
    FooterMainComponent,
    FooterDownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
