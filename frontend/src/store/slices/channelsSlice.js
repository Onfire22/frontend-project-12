import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTES } from '../../routes/routes';

const initialState = {
  channels: [],
  status: 'idle',
  errors: null,
  activeChannel: {
    id: '1',
    name: 'general',
    removable: false,
  },
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchAll',
  async (_, {
    getState,
    rejectWithValue,
  }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(API_ROUTES.getChannels, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue('Неудалось загрузить каналы');
    }
  },
);

export const createChannel = createAsyncThunk(
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

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async (payload, {
    getState,
  }) => {
    const { token } = getState().auth;
    const { activeChannel } = getState().modals;
    const newChannel = {
      name: payload,
    };
    await axios.patch(API_ROUTES.renameChannel(activeChannel), newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (_, {
    getState,
  }) => {
    const { token } = getState().auth;
    const { activeChannel } = getState().modals;
    await axios.delete(API_ROUTES.removeChannel(activeChannel), {
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
    handleRenameChannel: (state, { payload }) => {
      const newChannels = state.channels.map((channel) => {
        if (payload.id === channel.id) {
          return {
            ...channel,
            name: payload.name,
          };
        }
        return channel;
      });
      state.channels = newChannels;
    },
    handleDeleteChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.errors = null;
        state.channels = payload;
      })
      .addCase(createChannel.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'pending';
        state.errors = null;
      })
      .addCase(renameChannel.fulfilled)
      .addCase(removeChannel.fulfilled)
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.errors = action.payload || action.error.message;
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.status = 'idle';
      });
  },
});

export const {
  setActive,
  getChannel,
  handleDeleteChannel,
  handleRenameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
