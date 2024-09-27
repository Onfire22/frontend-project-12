/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';
import { handleDeleteChannel } from './channelsSlice';

const initialState = {
  messages: [],
  status: 'idle',
  errors: null,
};

// export const fetchMessages = createAsyncThunk(
//   'messages/fetchMessages',
//   async (_, {
//     getState,
//   }) => {
//     try {
//       const { token } = getState().auth;
//       const response = await axios.get(API_ROUTES.messages(), {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (e) {
//       return e;
//     }
//   },
// );

// export const createMessage = createAsyncThunk(
//   'messages/createMessage',
//   async (payload, {
//     getState,
//   }) => {
//     const { token } = getState().auth;
//     const message = {
//       text: payload,
//       channelId: getState().channels.activeChannel.id,
//       author: getState().auth.username,
//     };
//     await axios.post(API_ROUTES.messages(), message, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   },
// );

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
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchMessages.fulfilled, (state, { payload }) => {
      //   state.messages = payload;
      // })
      // .addCase(fetchMessages.pending, (state) => {
      //   state.status = 'pending';
      //   state.errors = null;
      // })
      .addCase(handleDeleteChannel, (state, { payload }) => {
        state.messages = state.messages.filter((message) => message.id !== payload.id);
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.errors = action.errors.message;
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.errors = null;
        state.status = 'idle';
      });
  },
});

export const { getMessages, getMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
