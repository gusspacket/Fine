import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
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

  constructor
  (
    private settingsService: SettingsService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute
  ){}


  ngOnInit() {

    this.cartService.updateItemCartCount()

    this.itemCountSubscription = this.cartService.itemCount$.subscribe(itemCount => {
      this.itemCount = itemCount;
    })

  }





  letsSearch(searchTerm: string): void {
    this.router.navigate(['/search'], {
      queryParams: { term: searchTerm },
    });
    this.searchTerm = '';
  }





}
