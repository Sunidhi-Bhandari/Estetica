import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    appointment: appointmentReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("cart_state", JSON.stringify(state.cart));
  } catch (e) { }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
