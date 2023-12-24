import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  phone: Product[] = [];
  laptop: Product[] = [];
  // id: Product;

  private phoneUrl = 'http://89.108.114.139/api/category/smarfony/';
  private categoryUrl = 'http://89.108.114.139/api/category/';
  private laptopUrl = 'http://89.108.114.139/api/category/noutbuki/';
  private getProductbyIdUrl = 'http://89.108.114.139/api/product/?id='

  getProductById(id: number):Observable<Product> {
    const fullUrl = `${this.getProductbyIdUrl}${id}`;
    return this.http.get<Product>(fullUrl)
  }


  getAllPhones2(): Observable<Product[]> {
    return this.http.get<Product[]>(this.phoneUrl)
  }
  getAllLaptops2(): Observable<Product[]> {
    return this.http.get<Product[]>(this.laptopUrl)
  }

  getProductsByCategory(category: string) {
    const fullUrl = `${this.categoryUrl}${category}${'/'}`;
    return this.http.get<Product[]>(fullUrl)

  }



  // getAllLaptops(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.laptopUrl).pipe(
  //     map(laptops =>
  //       laptops.flatMap(laptops =>
  //         laptops.skus.map(sku => ({ ...laptops, sku: sku}))
  //       )
  //     )
  //   );
  // }


  // getAllPhones(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.phoneUrl).pipe(
  //     map(phones =>
  //       phones.flatMap(phone =>
  //         phone.skus.map(sku => ({ ...phone, sku: sku}))
  //       )
  //     )
  //   );
  // }

  // getAllPhonesSearch(searchTerm: string): Observable<Product[]> {
  //   const params = searchTerm ? { term: searchTerm } : {}; // параметры запроса

  //   return this.http.get<Product[]>(this.phoneUrl, { params }).pipe(
  //     map(phones =>
  //       phones.flatMap(phone =>
  //         phone.sku.map(sku => ({ ...phone, sku: sku }))
  //       )
  //     )
  //   );
  // }



  // getPhoneById(id: number): Observable<Product | undefined> {
  //   return this.getAllPhones().pipe(
  //     map(phones => {

  //       if (phones) {
  //         const phoneWithSku = phones.find(phone => {
  //           return phone.skus && phone.skus.some(sku => phone.sku.id === id);
  //         });

  //         if (phoneWithSku) {

  //           const sku = phoneWithSku.skus.find(s => s.id === id);
  //           return { ...phoneWithSku, skus: [sku] };
  //         }
  //       }
  //       console.log("Phone not found for id:", id);
  //       return undefined;
  //     })
  //   );
  // }

  // getLaptopById(id: number): Observable<Product | undefined> {
  //   return this.getAllLaptops().pipe(
  //     map(laptops => {

  //       if (laptops) {
  //         const laptopsWithSku = laptops.find(laptops => {
  //           return laptops.skus && laptops.skus.some(sku => laptops.sku.id === id);
  //         });

  //         if (laptopsWithSku) {

  //           const sku = laptopsWithSku.skus.find(s => s.id === id);
  //           return { ...laptopsWithSku, skus: [sku] };
  //         }
  //       }
  //       console.log("Phone not found for id:", id);
  //       return undefined;
  //     })
  //   );
  // }



  // getAllPhonesAsync(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.phoneUrl).pipe(delay(2000),
  //     map(phones =>
  //       phones.flatMap(phone =>
  //         phone.skus.map(sku => ({ ...phone, sku: sku}))
  //       )
  //     )

  //   );
  // }












}


