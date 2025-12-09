import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ColorItem = {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};

type FileItem = {
  id: number;
  original_name: string;
  path: string;
  mime_type: string;
  size: number;
  fileable_type: string;
  fileable_id: number;
  url: string;
  created_at: string;
  updated_at: string;
};

type User = {
  id: number;
  name: string | null;
  email: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  seller: string | null;
};

export type ProductItem = {
  id: number;
  user_id: number;
  category_id: number;
  sub_category_id: number;
  title: string;
  description: string;
  discount: string;
  is_wishlist: boolean;
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  colors: ColorItem[];
  files: FileItem[];
  user: User;
};

export type CartItem = {
  product: ProductItem;
  count: number;
  selectedColor?: number;
  status?: string;
  date?: string;
  time?: string;
  packing?: boolean;
};

type CartState = {
  cartItem: CartItem[];
};

const initialState: CartState = {
  cartItem: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    appendCartProducts: (state, action: PayloadAction<CartItem>) => {
      state.cartItem = [...state.cartItem, action.payload];
    },
    removeCartProduct: (state, action) => {
      const id = action.payload;
      const existingIndex = state.cartItem.findIndex(
        (item) => item.product.id === id
      );
      state.cartItem.splice(existingIndex, 1);
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      let updatedId = action.payload.product.id;
      const newArray = state.cartItem.map((item) => {
        if (item.product.id === updatedId) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      state.cartItem = newArray;
    },
  },
});

export const { appendCartProducts, removeCartProduct, updateCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
