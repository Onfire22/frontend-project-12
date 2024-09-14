import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    name: '',
    activeChannel: '',
  },
  reducers: {
    closeModal: (state) => {
      state.name = '';
    },
    openModal: (state, { payload }) => {
      if (!payload.id) {
        state.name = payload.name;
        state.activeChannel = '';
      } else {
        state.name = payload.name;
        state.activeChannel = payload.id;
      }
    },
  },
});

export const { closeModal, openModal } = modalsSlice.actions;
export default modalsSlice.reducer;
