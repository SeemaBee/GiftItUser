import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "./productSlice";

export type WishlistItem = {
  id: number;
  user_id: number;
  product_id: number;
  product: ProductItem;
  created_at: string;
  updated_at: string;
};

type WishlistState = {
  wishlist: WishlistItem[];
};

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishlist = action.payload;
    },
    updateWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const newItem = action.payload;
      state.wishlist.push(newItem);
    },
    removeFromWishList: (state, action) => {
      const id = action.payload;
      const existingIndex = state.wishlist.findIndex(
        (item) => item.product_id === id
      );
      state.wishlist.splice(existingIndex, 1);
    },
  },
});

export const { setWishlist, updateWishlist, removeFromWishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
