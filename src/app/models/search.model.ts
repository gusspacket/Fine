export interface Search {
  id: number,
  sku:string,
  description: string,
  brand: string,
  price: number,
  img_url: string,
  quantity: number,
  stock: number,
  characteristic: Characteristic,
  productAddedToCart: boolean;
  active: boolean,
  title: string

}



export interface Characteristic {
  name: string;
  value: string;
}
