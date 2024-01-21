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


@Component({
  selector: 'app-auth-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-code.component.html',
  styleUrl: './auth-code.component.css'
})
export class AuthCodeComponent implements OnInit {


  isInputDisabled: boolean = false
  userName:string
  userPassword: number;

  timeInSeconds: number = 15;
  timer;

  errorMessage: string;


  passwordCorrect = true
  wrongCodeAttempts: number = 0;
  tryAgainButton = false
  isAuth = false


  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService,
    private tokenService: TokenService
    ) {
  }


  ngOnInit(): void {
    this.userName = this.authService.userName
    this.startTimer()
    this.wrongCodeAttempts = 0

  }

  passwordChange(event) {
    const passwordValue = String(event).trim()
    if (passwordValue.length === 4 && /^\d+$/.test(passwordValue)) {
      this.isInputDisabled = true
      this.letsAuth()
    }
  }

  letsAuth() {
    const phoneLogin = this.userName
    const cleanedNumber = phoneLogin.replace(/\D/g, '').toString()
    const username = parseInt(cleanedNumber, 10)

    const authData: AuthLogin = {
      username: username,
      code: this.userPassword
    };

    this.authService.postUserData(authData)
      .pipe(
        catchError((error: any) => {
          if (error.error && error.error.code === 1001) {
            console.log('Неверный код');
            // this.isInputDisabled = false
            this.userPassword = null;
            // this.wrongCodeAttempts++
            if(this.wrongCodeAttempts < 2) {
              this.wrongCodeAttempts++
              this.errorMessage = "Вы ввели не верный код, попробуйте снова"
              this.isInputDisabled = false
              this.userPassword = null;
            }
            if(this.wrongCodeAttempts >=2) {
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
        this.authService.setLoggedInStatus(true)
        this.tokenService.setAuthToken(token);
        this.stopTimer();
        timer(2000).pipe(delay(0)).subscribe(() => {
          this.closeModal();
          this.router.navigate(['/user'])
        })

          // this.closeModal();
          // this.router.navigate(['/user'])



      });
  }

  closeModal(): void {
    this.dialogRef.close();
  }


  backToCodeItputFalse() {
  this.authService.phoneInputSubject.next(true)


  }
  onTryAgainClick() {
    this.tryAgainButton = false
    this.isInputDisabled= false
    this.errorMessage = ''
    this.userPassword = null;
    this.resetTimer();
    this.wrongCodeAttempts = 0
    this.letsAuth()
  }

  resetTimer() {
    this.stopTimer();
    this.isInputDisabled = false;
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

}
