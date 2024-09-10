import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';

const initialState = {
  channels: [],
  status: 'idle',
  errors: null,
  activeChannel: '1',
};

const fetchChannels = createAsyncThunk(
  'channels/fetchAll',
  async (_, {
    getState,
  }) => {
    const { token } = getState().auth;
    const response = await axios.get(API_ROUTES.getChannels, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActive: (state, { payload }) => {
      state.activeChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'pending';
        state.errors = null;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.errors = null;
        state.channels = payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      });
  },
});

export { fetchChannels };
export const { setActive } = channelsSlice.actions;
export default channelsSlice.reducer;
