import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthComponent } from 'src/app/auth/auth.component';
import { Product } from 'src/app/models/product.model';
import { Settings } from 'src/app/models/settings.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/servise/auth.service';
import { TokenService } from 'src/app/servise/token.service';
import { UserService } from 'src/app/servise/user.service';
import { Collapse } from 'bootstrap'

@Component({
  selector: 'app-header-part-main',
  templateUrl: './header-part-main.component.html',
  styleUrls: ['./header-part-main.component.css']
})

export class HeaderPartMainComponent implements OnInit {


  @Input()
  settings: Settings;
  @Input() categoriesAll: any;


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
    private userService: UserService,
    private tokenService: TokenService,private elementRef: ElementRef
  ){}


  ngOnInit() {


    // this.elementRef.nativeElement.querySelector('.offcanvas-backdrop').classList.remove('show');


    // this.openDialog('200ms', '100ms')
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogging = isLoggedIn;})

      this.userService.user$.subscribe((user$) => {
        if(user$) {
         this.user = user$
        }
      })

    // this.cartService.updateItemCartCount()

    // this.itemCountSubscription = this.cartService.itemCount$.subscribe(itemCount => {
    //   this.itemCount = itemCount;
    // })

  }


  authOrUser() {
    this.authService.checkBrowserTokenWithServer().subscribe(
        (isLoggedIn: boolean) => {
            if (isLoggedIn) {
                this.router.navigate(['/user']);
            } else {
                this.openDialog('300ms', '100ms');
            }
        },
        error => {
          this.openDialog('300ms', '100ms'); // Можете выполнить другие действия в случае ошибки.
        }
    );
  }


  letsSearch(searchTerm: string): void {
    if(searchTerm.length >=1) {
        this.router.navigate(['/search'], {
          queryParams: { term: searchTerm },
        });

      // this.searchTerm = '';
    }


  }


  openDialog(enterAnimationDuration, exitAnimationDuration): void {
    this.dialog.open(AuthComponent, {
      width: '320px',
      height:'320px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  logOut() {
    this.authService.deleteTokenFromServer()
    this.tokenService.clearAuthToken()
    this.authService.setLoggedInStatus(false)
    this.router.navigate(['/']);
    this.authService.isLoggedInSubject.next(false);
  }



  collapseAccordion() {
    const accordion = document.getElementById('flush-collapseOne');
    const accordionInstance = new Collapse(accordion); // создаем экземпляр аккордеона
    accordionInstance.hide(); // сворачиваем аккордеон
  }






}
