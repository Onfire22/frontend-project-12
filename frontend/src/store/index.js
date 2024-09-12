import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import channelsSlice from './slices/channelsSlice';
import messagesSlice from './slices/messagesSlice';
import modalsSlice from './slices/modalsSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
    modals: modalsSlice,
  },
});
