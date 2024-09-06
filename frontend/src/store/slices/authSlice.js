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
    loggedIn: (state) => {
      const data = JSON.parse(localStorage.getItem('user'));
      if (data) {
        state.username = data.username;
        state.token = data.token;
      } else {
        state = initialState;
      }
    },
  },
});

export const { logIn, loggedIn } = authSlice.actions;
export default authSlice.reducer;
