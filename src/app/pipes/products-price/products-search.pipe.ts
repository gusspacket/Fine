import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "src/app/models/product.model";



@Pipe({
  name:'searchProductsBrandPipe'
})


export class SerchProductsPipe implements PipeTransform {

  // transform(products:Product[], value):Product[] {
  //   return products.filter(product => {
  //     return product.brand.name.toLowerCase().includes(value)
  //   })
  // }

  transform(products: Product[], selectedBrands: { [key: string]: boolean }): Product[] {
    if (!products) {
      return [];
    }

    if (!selectedBrands || Object.values(selectedBrands).every(value => !value)) {
      return products; // Возвращаем все продукты, если нет выбранных брендов
    }

    return products.filter(product => {
      const brandName = product.brand.name.toLowerCase();
      return Object.keys(selectedBrands).some(brand => selectedBrands[brand] && brand.toLowerCase() === brandName);
    });
  }



}
