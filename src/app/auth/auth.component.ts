import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthPhoneComponent } from './auth-phone/auth-phone.component';
import { AuthCodeComponent } from './auth-code/auth-code.component';
import { AuthService } from '../servise/auth.service';
import { Observable, Subscription, every } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, AuthPhoneComponent, AuthCodeComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  @Input() message?: string
  phoneInput:boolean
  phoneInputSubscription: Subscription



  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.phoneInputSubject.next(true)
    this.phoneInputSubscription = this.authService.phoneInput$.subscribe(data => {
      this.phoneInput = data
    })
  }







}
