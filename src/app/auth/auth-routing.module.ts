import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthCodeComponent } from './auth-code/auth-code.component';
import { AuthPhoneComponent } from './auth-phone/auth-phone.component';


const routes: Routes = [

  {
    path: 'modal',
    outlet: "modal",
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {path: '', component: AuthPhoneComponent},
      {path: '', component: AuthCodeComponent}
    ]}
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
