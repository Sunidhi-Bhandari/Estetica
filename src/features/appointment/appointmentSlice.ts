import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../type";

type AppointmentState = {
  items: CartItem[]; 
  discountPercent: number;
};

const initialState: AppointmentState = {
  items: [],
  discountPercent: 0,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointmentItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    updateItemQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const it = state.items.find(i => i.id === action.payload.id);
      if (it) it.qty = Math.max(1, action.payload.qty);
    },
    setDiscountPercent(state, action: PayloadAction<number>) {
      state.discountPercent = action.payload;
    },
    clearAppointment(state) {
      state.items = [];
      state.discountPercent = 0;
    },
  },
});

export const { setAppointmentItems, updateItemQty, setDiscountPercent, clearAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
