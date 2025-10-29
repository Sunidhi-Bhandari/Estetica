export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};
