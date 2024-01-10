import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthModalComponent } from 'src/app/auth-modal/auth-modal.component';
import { Product } from 'src/app/models/product.model';
import { Settings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/servise/settings.service';

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


  enterAnimationDuration:string
  exitAnimationDuration:string


  constructor
  (
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ){}


  ngOnInit() {
    this.openDialog(this.enterAnimationDuration, this.exitAnimationDuration)
    // this.cartService.updateItemCartCount()

    // this.itemCountSubscription = this.cartService.itemCount$.subscribe(itemCount => {
    //   this.itemCount = itemCount;
    // })

  }





  letsSearch(searchTerm: string): void {
    this.router.navigate(['/search'], {
      queryParams: { term: searchTerm },
    });
    this.searchTerm = '';
  }


  openDialog(enterAnimationDuration, exitAnimationDuration): void {
    this.dialog.open(AuthModalComponent, {
      width: '320px',
      height:'320px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }







}
