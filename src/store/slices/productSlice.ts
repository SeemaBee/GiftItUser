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

type ProductState = {
  products: ProductItem[];
  selectedProduct: ProductItem;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: <ProductItem>{},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductItem[]>) => {
      state.products = action.payload;
    },
    appendProducts: (state, action: PayloadAction<ProductItem[]>) => {
      const existingIds = new Set(state.products.map((p) => p.id));

      const newProducts = action.payload.filter(
        (item) => !existingIds.has(item.id)
      );

      state.products = [...state.products, ...newProducts];
    },
    setSelectedProduct: (state, action: PayloadAction<ProductItem>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct, appendProducts } =
  productSlice.actions;

export default productSlice.reducer;
