import { AuthError } from './../models/auth-error.model';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


@Component({
  selector: 'app-auth-modal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  isLoggin:boolean = false;
  isInputDisabled:boolean = false;
  // phoneFormControl = new FormControl('value', Validators.minLength(2))
  codeInput:boolean = false
  phoneInput:boolean = true
  userName: string;
  userPassword:number;

  timeInSeconds: number = 5;
  timer;

  errorMessage: string;
  isErrorCode:boolean = false
  error: AuthError


  closeModal(): void {
    this.dialogRef.close();
  }

  backToCodeItputFalse() {
    this.phoneInput = true
    this.userName = ''
  }




  getCode() {
    const phoneData: AuthSmsService = {
      phone: this.userName
    }
    this.authService.sendSmsToServer(phoneData).subscribe(() => {
      this.phoneInput = false
      this.codeInput = true
      this.startTimer()
    })
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

  resetTimer() {
    this.stopTimer();
    this.isInputDisabled = false;
    this.timeInSeconds = 5
    this.startTimer()

  }


    onTryAgainClick() {
      this.userPassword = null;
      this.resetTimer();

    }


  letsAuth() {
    const authData: AuthLogin = {
          username: this.userName,
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
          console.log(token);
          this.isLoggin= true;
          this.tokenService.setAuthToken(token);
          this.stopTimer();
          this.closeModal();

        });

  }







}
