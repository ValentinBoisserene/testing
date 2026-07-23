export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  total: number;
  portions: number;
}

export const cart: CartItem[] = [];