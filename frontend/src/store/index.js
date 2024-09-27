import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import channelsSlice from './slices/channelsSlice';
import modalsSlice from './slices/modalsSlice';
import { channelsApi } from './api/channelsApi';
import { messagesApi } from './api/messagesApi';

export default configureStore({
  reducer: {
    auth: authSlice,
    channels: channelsSlice,
    modals: modalsSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
