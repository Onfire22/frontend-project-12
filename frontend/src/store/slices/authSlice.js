/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: JSON.parse(localStorage.getItem('user'))?.username,
  token: JSON.parse(localStorage.getItem('user'))?.token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload));
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
