import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../servise/search.service';
import { Search } from '../models/search.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  searchProducts: Search[] = [];
  searchTerm: string

  // filteredPhones: Product[] = [];
  noResultsFound = false;
  shortQuery = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) {
  }

  ngOnInit(): void {

    // this.route.queryParams.subscribe(params => {
    //   this.searchTerm = params['term'];

    //   this.searchService.getAllProducts(this.searchTerm).subscribe(
    //     (products: any) => {
    //       this.searchProducts = products;
    //       this.noResultsFound = false;
    //       console.log("SEARCH PRODUCT", this.searchProducts);
    //     },
    //     (error: any) => {
    //       if (error.status === 404) {
    //         this.noResultsFound = true;
    //         this.shortQuery = false;
    //       } else if (error.error && error.error.error === 2002 && error.error.message.includes("короткий запрос")) {
    //         this.shortQuery = true;
    //         this.noResultsFound = false;
    //       }
    //     }
    //   );
    // });


    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];

      this.searchService.getAllProducts(this.searchTerm).pipe(
        catchError(error => {
          if (error.status === 404) {
            const errorMessage = error.error.message || error.error;

            if (errorMessage.includes("len(a) < 2")) {
              // Обработка ошибки "слишком короткий запрос"
              this.shortQuery = true
              console.log("Слишком короткий запрос");
            } else {
              // Обработка ошибки "не найдено"
              this.noResultsFound = true;
              console.log("Ничего не найдено");
            }
          } else {
            // Обработка других ошибок
            console.error("Произошла ошибка:", error);
          }

          // Возвращаем пустой массив или другое значение по умолчанию
          return of([]);
        })
      ).subscribe(
        (products: any) => {
          this.searchProducts = products;
          this.noResultsFound = false;
          console.log("SEARCH PRODUCT", this.searchProducts);
        }
      );
    });




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

//     this.productService.getAllPhonesSearch(this.searchTerm).subscribe(
//       phones => {
//         this.filteredPhones = phones.filter(phone =>
//           this.containsKeyword(phone, this.searchTerm)
//         );

//         // Проверка наличия совпадений и установка переменной noResultsFound
//         this.noResultsFound = this.filteredPhones.length === 0;
//       },
//       error => {
//         console.error('Error fetching phones:', error);
//       }
//     );
//   });
// }

// private containsKeyword(phone: Product, searchTerm: string): boolean {
//   // Преобразуйте все значения объекта в массив и проверьте совпадение с ключевым словом
//   const values = Object.values(phone);
//   for (const value of values) {
//     if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return true;
//     }
//   }

//   // Проверьте ключевое слово в подмассивах (например, skus)
//   const nestedValues = values.filter(value => Array.isArray(value)).flat();
//   for (const nestedValue of nestedValues) {
//     if (typeof nestedValue === 'string' && nestedValue.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return true;
//     }
//   }

//   return false;
// }








