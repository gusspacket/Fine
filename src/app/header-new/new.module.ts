import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderNewComponent } from './header-new.component';


const routes: Routes = [

  {path: 'header', component: HeaderNewComponent}


// {path: 'product', component: ProductComponent},








];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainRoutingModule { }
