import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductItem = {
  country_code: string;
  email: string;
  id: number;
  name: string;
  image: string | null;
  phone_no: string;
  user_name: string;
  gender: string | null;
};

const initialState = {
  products: [],
  selectedProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
  },
});

export const { setProducts, setSelectedProducts } = productSlice.actions;

export default productSlice.reducer;
