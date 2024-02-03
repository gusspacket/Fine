import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/servise/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  constructor(private userService:UserService) {}


  form: FormGroup;
  editedUser
  originalUser

  ngOnInit(): void {


    this.userService.user$.subscribe((user: User) => {
      this.editedUser = user
      this.originalUser = {... user}})


    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
      })
    })




  }


    onSubmit() {
      console.log("SUBMITED", this.form);

    }


}
