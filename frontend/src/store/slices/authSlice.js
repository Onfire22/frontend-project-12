import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
  error: null,
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
    logOut: () => {
      localStorage.clear();
      return initialState;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
