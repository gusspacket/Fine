import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../servise/search.service';
import { Search } from '../models/search.model';
import { ProductService } from '../servise/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  searchProducts: Product[]
  searchTerm: string

  noResultsFound = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private productService: ProductService) {
  }

  searchCat
  searchSlug:string
  sproduct

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];

      this.searchService.getAllProducts(this.searchTerm).subscribe(
        (products: any) => {
          if (products.length === 0) {
            this.noResultsFound = true;
          } else {
            this.searchProducts = products;
           this.searchCat = products.forEach(product => {
            this.searchSlug = product.category.slug
           });

            this.noResultsFound = false;
          }
        }
      );
    });
  }






  letsSearch(searchTerm: string) {
    if(searchTerm.length >=1) {
      this.router.navigate(['/search'], {
        queryParams: { term: searchTerm },
      });
      this.searchTerm = '';
    }
  }

  addToCart(product) {

  }




}









