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
      const data = JSON.parse(localStorage.getItem('user'));
      if (data) {
        state.username = data.username;
        state.token = data.token;
      }
      if (payload) {
        state.username = payload.username;
        state.token = payload.token;
      }
    },
  },
});

export const { logIn } = authSlice.actions;
export default authSlice.reducer;
