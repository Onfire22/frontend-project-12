/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    name: null,
    data: null,
  },
  reducers: {
    closeModal: (state) => {
      state.name = null;
    },
    openModal: (state, { payload }) => {
      if (!payload.id) {
        state.name = payload.name;
        state.data = null;
      } else {
        state.name = payload.name;
        state.data = payload.id;
      }
    },
  },
});

export const { closeModal, openModal } = modalsSlice.actions;
export default modalsSlice.reducer;
