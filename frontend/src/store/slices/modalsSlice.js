import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    show: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleModal } = modalsSlice.actions;
export default modalsSlice.reducer;
