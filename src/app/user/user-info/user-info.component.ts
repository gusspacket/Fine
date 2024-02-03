import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/servise/token.service';
import { UserService } from 'src/app/servise/user.service';
import { Subscription, filter, take } from 'rxjs';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgxMaskModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements  OnInit {




  user: User
  isEditingSubscription: Subscription
  isEditing
  originalUser: User


  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {

  }
  ngOnInit(): void {

    this.userService.isEditings$.subscribe((data) => {
      if (!data) {
        this.userService.user$.subscribe((userData: User)=> {
          this.user = userData
        })

      }
    })



  }




  startEdit() {
    this.userService.isEditingSubject.next(true)

  }
}
