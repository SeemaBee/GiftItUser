import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserItem = {
  country_code: string;
  email: string;
  id: number;
  name: string;
  image: string | null;
  phone_no: string;
  user_name: string;
  gender: string | null;
};

const defaultUser: UserItem = {
  country_code: '',
  email: '',
  id: 0,
  name: '',
  image: null,
  phone_no: '',
  user_name: '',
  gender: null,
};

const initialState = {
  token: '',
  user: defaultUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserItem>) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.token = '';
      state.user = defaultUser;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
