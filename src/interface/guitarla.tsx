export interface GuitarLa {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface CartItem extends GuitarLa {
  quantity: number;
}
