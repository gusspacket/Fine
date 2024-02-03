import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthLogin } from 'src/app/models/auth-login.model.';
import { AuthService } from 'src/app/servise/auth.service';
import { TokenService } from 'src/app/servise/token.service';
import { catchError, delay, of, timer } from 'rxjs';
import { UserTokenModel } from 'src/app/models/user-token.model';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthModalComponent } from 'src/app/auth-modal/auth-modal.component';
import { AuthSmsModel } from 'src/app/models/auth-sms.model';
import { DigitsOnlyDirective } from './digits-only.directive';



@Component({
  selector: 'app-auth-code',
  standalone: true,
  imports: [CommonModule, FormsModule, DigitsOnlyDirective],
  templateUrl: './auth-code.component.html',
  styleUrl: './auth-code.component.css'
})
export class AuthCodeComponent implements OnInit {


  isInputDisabled: boolean = false
  userNameFromAuth:string
  userNameTypeNumber:any
  userPassword: number;
  timeInSeconds: number = 7;
  timeInterval:number
  timer;
  errorMessage: string;
  passwordCorrect = true
  wrongCodeAttempts: number = 0;
  tryAgainButton = false
  isAuth = false
  timeIsOver = false
  reSend= false
  timeIntervalShow = false
  codeFalse = false


  constructor
  (
    private router:Router,
    public dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}


  ngOnInit(): void {
    this.userNameFromAuth = this.authService.userName
    this.startTimer()
    this.timeIntervalShow = true
    this.wrongCodeAttempts = 0

  }



  passwordChange(event) {
    const passwordValue = String(event).trim()
    if (passwordValue.length === 4 && /^\d+$/.test(passwordValue)) {
      // this.isInputDisabled = true
      this.letsAuth()
    }
  }


    // checkLength(event: Event) {
    //   const inputElement = event.target as HTMLInputElement;

    //   if (inputElement.value.length === 4) {
    //     if(this.timeInterval !== 0) {
    //       console.log("Ввели новый пароль",this.userPassword);
    //       this.letsAuth()
    //     }
    //   }

    // }

  letsAuth() {
    const phoneLogin = this.userNameFromAuth
    const cleanedNumber = phoneLogin.replace(/\D/g, '').toString()
    const username = parseInt(cleanedNumber, 10)
    this.userNameTypeNumber = username
    this.userPassword
    const authData: AuthLogin = {
      username: username,
      code: this.userPassword
    };

    this.authService.postUserData(authData)
      .pipe(
        catchError((error: any) => {
          if (error.error && error.error.code === 1001) {
            console.log('Неверный код');

            if(this.wrongCodeAttempts < 5) {
              this.userPassword = null;
              this.wrongCodeAttempts++
              this.codeFalse = true
            }
            if(this.wrongCodeAttempts >=5) {
              this.timeIntervalShow = false
              this.codeFalse = false
              this.isInputDisabled = true
              this.tryAgainButton = true
              this.stopTimer()
            }
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
        this.isAuth = true
        this.timeIntervalShow = false
        this.authService.setLoggedInStatus(true)
        this.tokenService.setAuthToken(token);
        this.stopTimer();
        timer(1000).pipe(delay(0)).subscribe(() => {
          this.closeModal();
          this.router.navigate(['/user'])
        })
      });
  }

  closeModal(): void {
    this.dialogRef.close();
  }


  backToCodeItputFalse() {
  this.authService.phoneInputSubject.next(true)
  }



  onTryAgainClick() {
    const phoneLogin = this.userNameFromAuth
    const cleanedNumber = phoneLogin.replace(/\D/g, '').toString()
    const username = parseInt(cleanedNumber, 10)
    const phone: AuthSmsModel = {
      phone: username
    }
    this.authService.sendSmsToServer(phone).subscribe()
    this.tryAgainButton = false
    this.isInputDisabled= false
    this.stopTimer()
    this.resetTimer();
    this.startTimer()
    this.timeIntervalShow=true
    this.wrongCodeAttempts = 0
  }

  resetTimer() {
    this.isInputDisabled = false;
    this.timeIsOver = false;
    this.errorMessage = null;
  }


  startTimer() {
    this.timeInterval = this.timeInSeconds
    this.isInputDisabled = false
    this.timer = setInterval(() => {
      if (this.timeInterval > 0) {
        this.timeInterval--;
      } else {
        this.codeFalse=false
        this.timeIntervalShow = false
        this.isInputDisabled = true
        this.timeIsOver = true
        this.stopTimer()
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer)
  }

}
