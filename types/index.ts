export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  discountAmount?: number;
}

export interface Cart {
  items: CartItem[];
  coupon: Coupon | null;
}
