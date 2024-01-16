import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { TokenService } from '../servise/token.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import IMask from 'imask';
import { UserService } from '../servise/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user:User
  editedUser: User;
  isEditing = false;
  changesMade = false
  originalUser: User
  phoneNumber: string = '';
  updateFlag = true
  form: FormGroup



  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router:Router,
    private userService: UserService
    ) {

  }


  ngOnInit(): void {
    this.tokenService.postUserDataWithToken().subscribe((data: User)=> {
      this.user = data
      this.originalUser = {...data}
    })

    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.email])
      }),


    })
  }

  logOut() {
    this.authService.deleteTokenFromServer()
    this.tokenService.clearAuthToken()
    this.authService.setLoggedInStatus(false)
    this.router.navigate(['/']);
    this.authService.isLoggedInSubject.next(false);
  }

  startEdit() {
    this.isEditing = true;
    this.editedUser = { ...this.user };

  }
  cancelEditing(): void {
    // Отмена редактирования
    this.isEditing = false;
  }

  saveChanges(): void {

  };


  onInputChange(event) {
    console.log(event);

  //   const nameLenght = this.originalUser.last_name.length
  //   const namevalue = this.originalUser.last_name
  //  if (namevalue != this.editedUser.last_name) {
  //   console.log("Changes");

  //  }


  }




// @ViewChild('phoneInput') phoneMaskInput: any;
@ViewChild('phoneInput', { static: false }) phoneMaskInput: ElementRef;

  ngAfterViewInit() {
    const maskOptions = {
      mask: '+{7} ({9}00) 000-00-00',
      lazy: false,
    };

    const mask = IMask(this.phoneMaskInput.nativeElement, maskOptions);



  }

  numberMask() {
    const inputElement = this.phoneMaskInput.nativeElement;
    const enteredNumber = inputElement.value;
    const cleanedNumber = enteredNumber.replace(/\D/g, '');
    console.log('Введенный телефонный номер:', +cleanedNumber);
  }





  changeUserInfo() {
    this.userService.changeUserInfo(this.editedUser).subscribe()
    this.isEditing = false
    this.updateFlag = true
  }



  onSubmit() {
    console.log("!!!!!",this.form);


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

  onAccept() {
    console.log('on accept')
  }
  onComplete() {
    console.log('on complete');
  }





}



