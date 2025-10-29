import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../type";
import { sampleProducts } from "../../data/products";

type ProductsState = {
  products: Product[];
  searchQuery: string;
  category: string;
  page: number;
  perPage: number;
};

const initialState: ProductsState = {
  products: sampleProducts,
  searchQuery: "",
  category: "",
  page: 1,
  perPage: 6,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
  },
});

export const { setProducts, setSearchQuery, setCategory, setPage, setPerPage } = productsSlice.actions;

export default productsSlice.reducer;