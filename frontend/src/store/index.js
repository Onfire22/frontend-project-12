import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import channelsSlice from './slices/channelsSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    channels: channelsSlice,
  },
});
