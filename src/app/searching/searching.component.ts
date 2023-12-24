import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../servise/search.service';
import { Search } from '../models/search.model';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  searchProducts: Search[] = []
  searchTerm: string

  noResultsFound = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];

      this.searchService.getAllProducts(this.searchTerm).subscribe(
        (products: any) => {
          if (products.length === 0) {
            this.noResultsFound = true;
          } else {
            this.searchProducts = products;
            this.noResultsFound = false;
          }
        }
      );
    });



    //   this.searchTerm = params['term'];

    //   this.searchService.getAllProducts(this.searchTerm).pipe(
    //     catchError(error => {
    //       if (error.status === 404) {
    //         const errorMessage = error.error.message || error.error;

    //         if (errorMessage.includes("len(a) < 2")) {
    //           // Обработка ошибки "слишком короткий запрос"
    //           this.shortQuery = true
    //           console.log("Слишком короткий запрос");
    //         } else {
    //           // Обработка ошибки "не найдено"
    //           this.noResultsFound = true;
    //           console.log("Ничего не найдено");
    //         }
    //       } else {
    //         // Обработка других ошибок
    //         console.error("Произошла ошибка:", error);
    //       }

    //       // Возвращаем пустой массив или другое значение по умолчанию
    //       return of([]);
    //     })
    //   ).subscribe(
    //     (products: any) => {
    //       this.searchProducts = products;
    //       this.noResultsFound = false;
    //       console.log("SEARCH PRODUCT", this.searchProducts);
    //     }
    //   );
    // });




  }






  letsSearch(searchTerm: string) {
    this.router.navigate(['/search'], {
      queryParams: { term: searchTerm },
    });
    this.searchTerm = '';
  }

  addToCart(product) {

  }




}









