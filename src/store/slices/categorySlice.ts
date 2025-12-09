import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: number;
  created_at: string;
  updated_at: string;
};

type CategoryState = {
  categories: CategoryItem[];
};

const initialState: CategoryState = {
  categories: [
    {
      id: 0,
      name: "All",
      slug: "all",
      description: null,
      status: 1,
      created_at: "",
      updated_at: "",
    },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryItem[]>) => {
      state.categories = [state.categories[0], ...action.payload];
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
