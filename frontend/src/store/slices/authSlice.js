import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: localStorage.getItem('user'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      console.log(payload);
      localStorage.setItem('user', payload.token);
      state.username = payload.username;
      state.token = payload.token;
    },
    logOut: (state) => {
      localStorage.clear();
      state.token = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
