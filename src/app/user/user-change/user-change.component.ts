import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/servise/token.service';
import { UserService } from 'src/app/servise/user.service';
import IMask from 'imask';
import { DigitsUserDirective } from './digits-only-user.directive';
import { NgxMaskModule } from 'ngx-mask';
import { UserCodeModalComponent } from '../user-code-modal/user-code-modal.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LettersOnlyDirective } from './lettetrs-only-user.directive';


@Component({
  selector: 'app-user-change',
  standalone: true,
  imports: [
    FormsModule,
    DigitsUserDirective,
    NgxMaskModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    CommonModule,
    LettersOnlyDirective
  ],
  templateUrl: './user-change.component.html',
  styleUrl: './user-change.component.css'
})
export class UserChangeComponent implements OnInit {

  @Input() user: User;


  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    public dialog: MatDialog
    ) {}



  editedUser: User;
  originalUser:User
  userIsChange: User
  isChangeTrue= false

  isFormValid = false
  isNameEmpty=false
  isLastNameEmpty=false
  isFirsNameEmpty = false
  isEmailCorrect= false
  isEmailEmpty = false
  isPhoneEmty = false


  haveChange= false
  noChangeError = "Данные не были изменены!"
  haveError = false

  enterAnimationDuration:string
  exitAnimationDuration:string

  form: FormGroup;
  @ViewChild('emailInput', { static: true }) emailInput: NgModel;



  ngOnInit(): void {

    // this.form = new FormGroup({
    //   user: new FormGroup({
    //     email: new FormControl('',[Validators.required, Validators.email]),
    //     first_name: new FormControl('', [Validators.required]),
    //     last_name: new FormControl('', [Validators.required]),
    //     phone: new FormControl('', [Validators.required])
    //   })
    // })



    // this.openDialog('200ms', '150ms')
    this.userService.user$.subscribe((user: User) => {
      this.editedUser = user
      this.originalUser = {... user}
      // this.form.get('user').patchValue(this.editedUser)

      this.userIsChange = {... user}
    })

  }



  onSubmit() {
    console.log("SUBMITED", this.form);

  }


  cancelEditing(): void {
    this.userService.isEditingSubject.next(false)
    this.userService.setUserInfo(this.originalUser)
  }



  getChangedFields(): Partial<User> {
    const changedFields: Partial<User> = {};

    for (const key in this.editedUser) {
      if (this.editedUser[key] !== this.userIsChange[key]) {
        changedFields[key] = this.editedUser[key];
        this.haveChange = true;
        // Добавьте проверку, если изменено поле "phone"
        if (key === 'phone') {
          console.log(`Телефон изменен: ${this.userIsChange[key]} -> ${this.editedUser[key]}`);
          this.haveChange = true
        }
      } else {
        this.haveChange = false;
      }
    }

    return changedFields;
  }




  changeUserInfo() {
    const changedFields = this.getChangedFields();
    console.log(changedFields);

      if(changedFields.phone) {
        this.openDialog('200ms', '100ms')
      }
      // this.userService.changeUserInfo(changedFields).subscribe()
      // this.userService.isEditingSubject.next(false)
     else {
      this.userService.changeUserInfo(changedFields).subscribe()
      this.userService.isEditingSubject.next(false)

    }

  }

  openDialog(enterAnimationDuration, exitAnimationDuration): void {
    this.dialog.open(UserCodeModalComponent, {
      width: '320px',
      height:'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { user: this.originalUser }
    });
  }





  // onInputFirstNameChange(event: any) {
  //     const inputText = event.target.value;
  //     if(inputText === this.originalUser.first_name) {
  //       this.isFormValid = false

  //     } else {
  //       this.isFormValid = true
  //     }

  //     if(inputText === '') {
  //       this.isFormValid = false
  //       this.isFirsNameEmpty = true
  //     } else {
  //       this.isFirsNameEmpty = false
  //       this.isFormValid = true
  //     }
  //     if(inputText.length === this.originalUser.first_name.length) {
  //       if(inputText === this.originalUser.first_name) {
  //         this.isFormValid = false
  //       }
  //     }
  // }

  onInputFirstNameChange(event: any) {

    this.editedUser.first_name = event.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
    const inputText = event.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
    if(inputText === this.originalUser.first_name) {
      this.isFormValid = false

    } else {
      this.isFormValid = true
    }

    if(inputText === '') {
      this.isFormValid = false
      this.isFirsNameEmpty = true
    } else {
      this.isFirsNameEmpty = false
      this.isFormValid = true
    }
    if(inputText.length === this.originalUser.first_name.length) {
      if(inputText === this.originalUser.first_name) {
        this.isFormValid = false
      }
    }
}

  onInputLastNameChange(event: any) {
    this.editedUser.last_name = event.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
    const inputText = event.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
    if(inputText === this.originalUser.last_name) {
      this.isFormValid = false

    } else {
      this.isFormValid = true
    }

    if(inputText === '') {
      this.isFormValid = false
      this.isLastNameEmpty = true
    } else {
      this.isLastNameEmpty = false
      this.isFormValid = true
    }

    if(inputText.length === this.originalUser.last_name.length) {
      if(inputText === this.originalUser.last_name) {
        this.isFormValid = false
      }
    }
  }

  onInputEmailChange(event: any) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const inputText = event.target.value;

    if (!emailPattern.test(this.editedUser.email)) {
      this.isFormValid = false
      this.isEmailCorrect = true
    } else {
      this.isFormValid = true
      this.isEmailCorrect = false
    }

    if(inputText.length === this.originalUser.email.length) {
      if(inputText === this.originalUser.email) {
        this.isFormValid = false
      }
    }

    if(inputText === '') {
      this.isEmailCorrect=false
      this.isEmailEmpty = true
    } else {
      this.isEmailEmpty = false
    }
  }


  isPhoneValid(): boolean {
    const editorUserPhoneString = this.editedUser.phone.toString();
    return editorUserPhoneString.length < 11
  }


  onInputPhoneChange(event: any) {
    const inputValue = event.target.value;
    const originalUserString = this.originalUser.phone.toString();
    // this.isPhoneValid2()

    // Если ввод пуст, снова устанавливаем маску
    if (!inputValue) {
      this.isFormValid = false;
      return;
    }

    // Если ввод начинается не с "+7", добавляем "+7" в начало
    if (!inputValue.startsWith('+7')) {
      this.editedUser.phone = +7 + inputValue.substring(2);
    }


  }

  onInputPhoneBefore(event: any) {

    if(event === this.originalUser.phone) {
     this.isFormValid=false
    } else {
      this.isFormValid=true
    }

    if(event.length === 0) {
      this.isPhoneEmty = true
    } else {
      this.isPhoneEmty = false
    }
  }




}

















