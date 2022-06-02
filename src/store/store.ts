import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app';
import { organizationsSlice } from './organizationsSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    organizations: organizationsSlice.reducer,
  },
});
