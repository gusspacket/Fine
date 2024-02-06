import { User } from './../../models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/servise/user.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/servise/auth.service';
import { catchError, of } from 'rxjs';
import { DigitsOnlyDirective } from 'src/app/auth/auth-code/digits-only.directive';
import { AuthSmsModel } from 'src/app/models/auth-sms.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserChangePhone } from 'src/app/models/user-change.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-code-modal',
  standalone: true,
  imports: [NgxMaskModule, FormsModule,CommonModule, DigitsOnlyDirective],
  templateUrl: './user-code-modal.component.html',
  styleUrl: './user-code-modal.component.css'
})
export class UserCodeModalComponent implements OnInit {

  userPhone:number
  changeUser:any
  userPassword: number;
  originalUserData:any
  smsButton=true;
  timeIntervalShow=false
  timeInterval:number
  isInputDisabled
  timeInSeconds:number = 10
  timer
  passwordCorrect=true;
  wrongCodeAttempts:number
  codeFalse = false
  tryAgainButton = false
  timeIsOver=false
  errorMessage:string
  isSaving=false
  isUserAlreadyExist=false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User, changed: User },
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCodeModalComponent>,
    private authService: AuthService,
    private router:Router
    ) {

  }




  ngOnInit(): void {
    console.log(this.data.changed.phone);
    this.userPhone = this.data.changed.phone
    this.changeUser = this.data.changed.phone





    // this.changeUser = this.changed.phone;
    // this.userPhone = this.changed

    this.originalUserData = this.data.user
  //   this.userService.user$.subscribe((user:User) => {
  //   this.userPhone = user.phone
  //   this.changeUser = user


  //  })
   this.wrongCodeAttempts = 0
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getUserCode() {
    const phone: AuthSmsModel = {
      phone: this.userPhone
    }
    this.authService.sendSmsToServer(phone).subscribe()
    this.smsButton=false
    this.timeIntervalShow=true
    this.startTimer()
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

  passwordChange(event) {
    const passwordValue = String(event).trim()
    if (passwordValue.length === 4 && /^\d+$/.test(passwordValue)) {
     this.letsAuth()

    }
  }

  letsAuth() {

    const changeInfo = {... this.data.changed}
    delete changeInfo.phone

    const username = this.userPhone
    const changePhoneData: UserChangePhone = {
      phone: username,
      code: this.userPassword
    };


    this.userService.changeUserPhone(changePhoneData)
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
          }
          else if (error.status === 400) {
            this.isUserAlreadyExist=true
            this.timeIntervalShow=false
            this.stopTimer()
            this.isInputDisabled = true
            this.userPassword = null

          }


          else {
            console.log('Другая ошибка');
          }
          // Возвращаем ваше собственное сообщение в виде Observable
          return of('ОШИБКА');
        })
      )
      .subscribe((response: any) => {

        if(response) {
          this.userService.changeUserInfo(changeInfo).subscribe()
          this.userService.isEditingSubject.next(false)
          this.closeModal();
          this.router.navigate(['/user'])

        }


      })


    }

    onTryAgainClick() {
      const phone: AuthSmsModel = {
        phone: this.userPhone
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





}
