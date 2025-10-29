import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../type";

type CartState = {
  items: CartItem[];
};

const saved = (() => {
  try {
    const raw = localStorage.getItem("cart_state");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as CartState;
    return parsed;
  } catch {
    return undefined;
  }
})();

const initialState: CartState = saved ?? { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; qty?: number }>) {
      const { product, qty = 1 } = action.payload;
      const exist = state.items.find(i => i.productId === product.id);
      if (exist) {
        exist.qty += qty;
      } else {
        state.items.push({
          id: `${product.id}_${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          qty,
          image: product.image,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const it = state.items.find(i => i.id === action.payload.id);
      if (it) {
        it.qty = Math.max(1, action.payload.qty);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
