import { UserService } from './../../../servise/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthModalComponent } from 'src/app/auth-modal/auth-modal.component';
import { Product } from 'src/app/models/product.model';
import { Settings } from 'src/app/models/settings.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/servise/auth.service';

@Component({
  selector: 'app-header-part-main',
  templateUrl: './header-part-main.component.html',
  styleUrls: ['./header-part-main.component.css']
})

export class HeaderPartMainComponent implements OnInit {


  @Input()
  settings: Settings;

  searchTerm = '';
  products$: Observable<Product[]>
  productsCart:Product[] = [];
  itemCount: number;
  itemCountSubscription: Subscription;
  isLogging:boolean = false
  isLoggedInSubscription: Subscription
  user:User



  enterAnimationDuration:string
  exitAnimationDuration:string


  constructor
  (
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ){}


  ngOnInit() {

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogging = isLoggedIn;})

    // this.cartService.updateItemCartCount()

    // this.itemCountSubscription = this.cartService.itemCount$.subscribe(itemCount => {
    //   this.itemCount = itemCount;
    // })

  }


  authOrUser() {
    this.authService.checkBrowserTokenWithServer().subscribe(
        (isLoggedIn: boolean) => {
            console.log(isLoggedIn);

            if (isLoggedIn) {
                this.router.navigate(['/user']);
            } else {
                this.openDialog('500ms', '100ms');
            }
        },
        error => {
          this.openDialog('500ms', '100ms'); // Можете выполнить другие действия в случае ошибки.
        }
    );
}


  letsSearch(searchTerm: string): void {
    this.router.navigate(['/search'], {
      queryParams: { term: searchTerm },
    });
    this.searchTerm = '';
  }


  openDialog(enterAnimationDuration, exitAnimationDuration): void {
    this.router.navigate(['']);
    this.dialog.open(AuthModalComponent, {
      width: '320px',
      height:'320px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }









}
