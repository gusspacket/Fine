import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth.component';
import { AuthService } from 'src/app/servise/auth.service';
import { CommonModule } from '@angular/common';
import IMask from 'imask';
import { AuthSmsService } from 'src/app/models/auth-sms.model';


@Component({
  selector: 'app-auth-phone',
  standalone: true,
  imports: [CommonModule, AuthComponent],
  templateUrl: './auth-phone.component.html',
  styleUrl: './auth-phone.component.css'
})
export class AuthPhoneComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService
  ) { }


  @ViewChild('phoneInput', { static: false }) phoneMaskInput: ElementRef ;
  isGetCodeButtonEnabled = false
  userDataNumber:any



  ngOnInit(): void {

  }


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


  getCode() {
    const enteredNumber = this.phoneMaskInput.nativeElement.value;
    this.authService.setUserName(enteredNumber)
    const cleanedNumber = enteredNumber.replace(/\D/g, '')
    const phoneAsNumber = parseInt(cleanedNumber, 10);
    this.userDataNumber = phoneAsNumber


    const phone: AuthSmsService = {
      phone: phoneAsNumber
    }
    this.authService.phoneInputSubject.next(false)
    this.authService.sendSmsToServer(phone).subscribe()
  }


  closeModal(): void {
    this.dialogRef.close();
  }



}
