import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import channelsSlice from './slices/channelsSlice';
import messagesSlice from './slices/messagesSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});
