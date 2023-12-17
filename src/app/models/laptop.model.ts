export interface Laptops {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
  brand: string;
  slug:string;
  category:number;
  sku: Sku;
  skus:Sku[];
}

export interface Characteristic {
  name: string;
  value: string;
}

export interface Sku {
  description: string;
      img_url: string;
      price: number;
      value:string;
      name: string;
      characteristics: Characteristic [];
}

