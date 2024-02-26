import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/category.model';
import { Collection } from 'src/app/models/collection.model';
import { CategoryService } from 'src/app/servise/category.service';
import { CollectionService } from 'src/app/servise/collection.service.';
import { BannerModule } from '../banner/banner.module';
import { BannerCollectionComponent } from '../banner-collection/banner-collection.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/servise/auth.service';
import { TokenService } from 'src/app/servise/token.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserService } from 'src/app/servise/user.service';

@Component({
  selector: 'app-section-main',
  standalone: true,
  imports: [CommonModule, BannerModule, BannerCollectionComponent, RouterModule],
  templateUrl: './section-main.component.html',
  styleUrl: './section-main.component.css'
})
export class SectionMainComponent implements OnInit {

  coolection: Collection
  // categories: Categories[] = [];
  visibleCategoriesCount: number;
  isLogging:boolean = false
  user:User
  categories:any
  banners



  constructor(
    private coolectionsService: CollectionService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
    ) {

  }


  ngOnInit(): void {



    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories
    })

    this.coolectionsService.getAllCollections().subscribe((collection) => {
      this.coolection = collection[0]
      this.banners = collection
    })

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLogging = isLoggedIn
    })



    this.visibleCategoriesCount = 9

    this.userService.user$.subscribe((user$) => {
      if(user$) {
       this.user = user$
      }
    })

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

  openDialog(enterAnimationDuration, exitAnimationDuration): void {
    this.dialog.open(AuthComponent, {
      width: '320px',
      height:'320px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
