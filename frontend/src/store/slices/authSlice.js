import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
    },
  },
});

export const { logIn } = authSlice.actions;
export default authSlice.reducer;
