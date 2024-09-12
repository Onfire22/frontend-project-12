import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';

const initialState = {
  channels: [],
  status: 'idle',
  errors: null,
  activeChannel: 'general',
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

const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (payload, {
    getState,
  }) => {
    const { token } = getState().auth;
    const newChannel = {
      name: payload,
      owner: getState().auth.username,
    };
    await axios.post(API_ROUTES.getChannels, newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActive: (state, { payload }) => {
      state.activeChannel = payload;
    },
    getChannel: (state, { payload }) => {
      state.channels.push(payload);
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
      })
      .addCase(createChannel.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(createChannel.rejected, (_state, action) => {
        console.log(action.error.message);
      });
  },
});

export { fetchChannels, createChannel };
export const { setActive, getChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
