import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';

const initialState = {
  username: '',
  token: '',
};

export const signUp = createAsyncThunk(
  'user/signup',
  async (payload) => {
    const response = await axios.post(API_ROUTES.signup(), payload);
    console.log(response);
    return response.data;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.username = payload.username;
        state.token = payload.token;
        localStorage.setItem('user', JSON.stringify(payload));
      })
      .addCase(signUp.pending)
      .addCase(signUp.rejected, (_, action) => {
        console.log(action);
      });
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
