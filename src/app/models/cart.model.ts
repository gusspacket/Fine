export interface Cart {
  id: number,
  brand: string,
  price: number,
  img: string,
  quantity: number,
  name:string,
  sku: Sku,
  productAddedToCart: boolean;

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

export interface Characteristic {
  name: string;
  value: string;
}
