/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  status: 'idle',
  errors: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, { payload }) => {
      state.messages = payload;
    },
    getMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessages: (state, { payload }) => {
      state.messages = state.messages.filter((message) => message.channelId !== payload.id);
    },
  },
});

export const { getMessages, getMessage, removeMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
