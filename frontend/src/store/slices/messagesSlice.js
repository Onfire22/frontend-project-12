import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';

const initialState = {
  messages: [],
  status: 'idle',
  errors: null,
};

const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, {
    getState,
  }) => {
    const { token } = getState().auth;
    const response = await axios.get(API_ROUTES.getMessages, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (payload, {
    getState,
  }) => {
    const { token } = getState().auth;
    const message = {
      text: payload,
      id: nanoid(),
    };
    const response = await axios.post(API_ROUTES.getMessages, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.errors = null;
        state.status = 'pending';
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.errors = null;
        state.status = 'idle';
        state.messages = payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      })
      .addCase(createMessage.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.messages.push(payload);
      })
      .addCase(createMessage.rejected, (_, action) => {
        console.log(action.error.message);
      });
  },
});

export { fetchMessages, createMessage };
export default messagesSlice.reducer;
