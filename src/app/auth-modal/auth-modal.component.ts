import { AuthError } from './../models/auth-error.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import IMask from 'imask';


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
  // PhoneNumber = new FormControl('+7');
   PhoneNumber = new FormControl('');
   control = new FormControl<number>(9);
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

  userDataNumber: number

  @ViewChild('phoneInput', { static: false }) phoneMaskInput: ElementRef ;
  phoneMask: any;




  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  @Input() startMask: boolean;

  ngOnInit(): void {

   console.log(this.startMask);

    this.authService.checkBrowserTokenWithServer()

  }

  backToCodeItputFalse() {
    this.phoneInput = true
    if (this.phoneInput) {
      // Проверяем, что переменная phoneMaskInput определена
      const maskOptions = {
        mask: '+{7} ({9}00) 000-00-00',
        lazy: false,
      };

      const mask = IMask(this.phoneMaskInput.nativeElement, maskOptions);
      // Остальной код
    }


  }

  closeModal(): void {
    this.dialogRef.close();
  }



lastMask:any
// ngAfterViewInit

  ngAfterViewInit() {
    const maskOptions = {
      mask: '{{+{7} ({9}00) 000-00-00}}',
      lazy: false,
    };
    const mask = IMask(this.phoneMaskInput.nativeElement, maskOptions);

    mask.on('accept', () => {
      const cleanedNumber = mask.unmaskedValue; // Получаем "чистое" значение без символов маски
      if (cleanedNumber && cleanedNumber.length === 11) {
        this.isGetCodeButtonEnabled = true;
      } else {
        this.isGetCodeButtonEnabled = false;
      }


    });
  }


  getCodeIMASK() {
    const enteredNumber = this.phoneMaskInput.nativeElement.value;
    this.userName = this.phoneMaskInput.nativeElement.value

    const cleanedNumber = enteredNumber.replace(/\D/g, '')
    const phoneAsNumber = parseInt(cleanedNumber, 10);
    this.userDataNumber = phoneAsNumber
    const phone: AuthSmsService = {
      phone: phoneAsNumber
    }
    this.authService.sendSmsToServer(phone).subscribe(() => {
      this.phoneInput = false
      this.codeInput = true
      this.startTimer()

    })
  }


  letsAuth() {
    const authData: AuthLogin = {
      username: this.userDataNumber,
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


  passwordChange(event) {
    const passwordValue = String(event).trim()
    if (passwordValue.length === 4 && /^\d+$/.test(passwordValue)) {
      this.isInputDisabled = true
      this.letsAuth()
    }
  }


  onTryAgainClick() {
    this.userPassword = null;
    this.resetTimer();

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






}

// СТАРЫЙ ИНПУТ

  // keyPressPhone(event): boolean {
  //   if ((this.PhoneNumber.value?.length || 0) >= 12) {
  //       event.preventDefault();
  //       return false;
  //   }
  //   const inp = String.fromCharCode(event.keyCode);
  //   if (/[0-9+]/.test(inp)) {
  //       return true;

  //   } else {
  //       event.preventDefault();
  //       return false;
  //   }
  // }

    // getCode() {
  //   const phoneData: AuthSmsService = {
  //     phone: +this.PhoneNumber.value.slice(1,12)
  //   }
  //   this.authService.sendSmsToServer(phoneData).subscribe(() => {
  //     this.phoneInput = false
  //     this.codeInput = true
  //     this.startTimer()
  //   })
  // }




