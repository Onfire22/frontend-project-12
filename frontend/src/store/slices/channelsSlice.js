/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  channels: [],
  status: 'idle',
  errors: null,
  activeChannel: {
    id: '1',
    name: 'general',
    removable: false,
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setActive: (state, { payload }) => {
      state.activeChannel = payload;
    },
    getChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    handleRenameChannel: (state, { payload }) => {
      const newChannels = state.channels.map((channel) => {
        if (payload.id === channel.id) {
          const newChannel = {
            ...channel,
            name: payload.name,
          };
          return newChannel;
        }
        return channel;
      });
      state.channels = newChannels;
    },
    handleDeleteChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
      state.activeChannel = initialState.activeChannel;
    },
  },
});

export const {
  setActive,
  getChannel,
  getChannels,
  handleDeleteChannel,
  handleRenameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
