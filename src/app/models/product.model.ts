export interface Product  {
  id: number;
  name: string;
  category: Category;
  title: string;
  slug: string;
  rate: number;
  brand: Brand;
  sku: string;
  description: string;
  img_url: string;
  price: number;
  stock: number;
  characteristics: Characteristics[]
  active: boolean;
  quantity: number;
  productAddedToCart?: boolean;

}

export interface Brand {
  id: number;
  name: string;
}


export interface Characteristics {
  name: string;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}









// export interface Product  {
//   count:number;
//   next:string;
//   previous:string
//   results: Results[]

// }

// export interface Results {
//   id: number;
//   name: string;
//   category: Category;
//   title: string;
//   slug: string;
//   brand: Brand;
//   sku: string;
//   description: string;
//   img_url: string;
//   price: number;
//   stock: number;
//   characteristics: Characteristics[]
//   active: boolean;
//   quantity: number;
//   productAddedToCart?: boolean;
// }

// export interface Brand {
//   id: number;
//   name: string;
// }


// export interface Characteristics {
//   name: string;
//   value: string;
// }

// export interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }











