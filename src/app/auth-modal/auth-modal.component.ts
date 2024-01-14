import { AuthError } from './../models/auth-error.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../servise/auth.service';
import { AuthLogin } from '../models/auth-login.model.';
import { AuthSmsService } from '../models/auth-sms.model';
import { UserTokenModel } from '../models/user-token.model';
import { catchError, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TokenService } from '../servise/token.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-auth-modal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  standalone: true,
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent implements OnInit {

  isInputDisabled: boolean = false;
  passwordCorrect = true
  PhoneNumber = new FormControl('+7');
  codeInput: boolean = false
  phoneInput: boolean = true
  userName: string;
  userPassword: number;

  timeInSeconds: number = 5;
  timer;

  errorMessage: string;
  isErrorCode: boolean = false
  error: AuthError
  isGetCodeButtonEnabled:boolean = false


  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.authService.checkBrowserTokenWithServer()
  }

  backToCodeItputFalse() {
    this.phoneInput = true
    this.userName = ''
  }

  closeModal(): void {
    this.dialogRef.close();
  }


  getCode() {
    const phoneData: AuthSmsService = {
      phone: this.PhoneNumber.value.slice(1,12)
    }
    this.authService.sendSmsToServer(phoneData).subscribe(() => {
      this.phoneInput = false
      this.codeInput = true
      this.startTimer()
    })
  }

  keyPressPhone(event): boolean {
    if ((this.PhoneNumber.value?.length || 0) >= 12) {
        event.preventDefault();
        return false;
    }
    const inp = String.fromCharCode(event.keyCode);
    if (/[0-9+]/.test(inp)) {
        return true;

    } else {
        event.preventDefault();
        return false;
    }
  }

  letsAuth() {
    const authData: AuthLogin = {
      username: this.PhoneNumber.value.slice(1,12),
      code: this.userPassword
    };
    this.authService.postUserData(authData)
      .pipe(
        catchError((error: any) => {
          if (error.error && error.error.code === 1001) {

            console.log('Неверный код');
            console.log('Сообщение:', error.error.message);
            this.stopTimer()
            this.isInputDisabled = true
            this.userPassword = null;
            this.errorMessage = "Вы ввели не верный код, попробуйте снова"

          } else {
            console.log('Другая ошибка');
          }
          // Возвращаем ваше собственное сообщение в виде Observable
          return of('ОШИБКА');

        })
      )
      .subscribe((response: UserTokenModel) => {
        const token = response.token
        if (!token) return
        console.log(token);
        this.authService.setLoggedInStatus(true)
        this.tokenService.setAuthToken(token);
        this.stopTimer();
        this.closeModal();
        this.router.navigate(['/user'])

      });

  }

  onTryAgainClick() {
    this.userPassword = null;
    this.resetTimer();

  }

  passwordChange(event) {
    const passwordValue = String(event).trim()
    if (passwordValue.length === 4 && /^\d+$/.test(passwordValue)) {
      this.isInputDisabled = true
      this.letsAuth()
    }
  }

  resetTimer() {
    this.stopTimer();
    this.isInputDisabled = false;
    this.timeInSeconds = 5
    this.startTimer()

  }

  startTimer() {
    this.isInputDisabled = false
    this.timer = setInterval(() => {
      if (this.timeInSeconds > 0) {
        this.timeInSeconds--;
      } else {
        clearInterval(this.timer);
        this.isInputDisabled = true
        this.userPassword = null;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer)
  }














  onPhoneNumberChange() {
    const inputValue = this.PhoneNumber.value || '';
    this.isGetCodeButtonEnabled = inputValue.length === 12;
  }



}
