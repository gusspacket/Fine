export interface Product  {
  id: number;
  name: string;
  price: number;
  img_url: string;
  description: string;
  brand: string;
  slug: string;
  category: number;
  sku: Sku;
  skus: Sku[];
  quantity: number;
  productAddedToCart?: boolean;



}

export interface Characteristic {
  name: string;
  value: string;
}

export interface Sku {
  id:number;
  description: string;
  img_url: string;
  price: number;
  value: string;
  name: string;
  characteristics: Characteristic[];
}

