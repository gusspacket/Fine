export interface Product2  {
  id: number;
  name: string;
  category: Category;
  title: string;
  slug: string;
  brand: string;
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


export interface Characteristics {
  name: string;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}




