import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { TokenService } from '../servise/token.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import IMask from 'imask';
import { UserService } from '../servise/user.service';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserChangeComponent } from './user-change/user-change.component';
import { Observable, Subscription } from 'rxjs';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports:
  [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserNavComponent,
    UserInfoComponent,
    UserChangeComponent,
    UserFormComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {




  user:User
  isEditingSubscription: Subscription;
  editedUser: User;
  isEditing = false;
  changesMade = false
  originalUser: User
  phoneNumber: string = '';
  updateFlag = true
  form: FormGroup
  user$



  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router:Router,
    private userService: UserService
    ) {

  }


  ngOnInit(): void {
   this.userService.isEditings$.subscribe(edit => {
    this.isEditing = edit})


    this.tokenService.postUserDataWithToken().subscribe((userData: User) => {
      this.user = userData
      this.userService.setUserInfo(userData)
    })









    // this.form = new FormGroup({
    //   user: new FormGroup({
    //     email: new FormControl('', [Validators.required, Validators.email]),
    //     password: new FormControl('', [Validators.required, Validators.email])
    //   }),
    // })
  }



  logOut() {
    this.authService.deleteTokenFromServer()
    this.tokenService.clearAuthToken()
    this.authService.setLoggedInStatus(false)
    this.router.navigate(['/']);
    this.authService.isLoggedInSubject.next(false);
  }

  startEdit() {
    this.userService.isEditingSubject.next(true)
    this.editedUser = { ...this.user };

  }


// @ViewChild('phoneInput') phoneMaskInput: any;
@ViewChild('phoneInput', { static: false }) phoneMaskInput: ElementRef;
// @ViewChild(UserInfoComponent) child1: UserInfoComponent
// @ViewChild(UserChangeComponent) child2: UserChangeComponent
// dataFromChild1: any;

  // ngAfterViewInit() {





  //   const maskOptions = {
  //     mask: '+{7} ({9}00) 000-00-00',
  //     lazy: false,
  //   };

  //   const mask = IMask(this.phoneMaskInput.nativeElement, maskOptions);



  // }

  numberMask() {
    const inputElement = this.phoneMaskInput.nativeElement;
    const enteredNumber = inputElement.value;
    const cleanedNumber = enteredNumber.replace(/\D/g, '');
     console.log('Введенный телефонный номер:', +cleanedNumber);
  }










  control = new FormControl<number>(12.3);
  mask = {
    mask: Number,
    scale: 2,
    signed: true,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };







}



