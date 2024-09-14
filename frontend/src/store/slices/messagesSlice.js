import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';

const initialState = {
  messages: [],
  status: 'idle',
  errors: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, {
    getState,
    rejectWithValue,
  }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(API_ROUTES.getMessages, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue('Не удалось загрузить сообщения');
    }
  },
);

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (payload, {
    getState,
  }) => {
    const { token } = getState().auth;
    const message = {
      text: payload,
      channelId: getState().channels.activeChannel.id,
    };
    await axios.post(API_ROUTES.getMessages, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.messages = payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'pending';
        state.errors = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.errors = action.payload || action.error.message;
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.errors = null;
        state.status = 'idle';
      });
  },
});

export const { addMessage, getMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
