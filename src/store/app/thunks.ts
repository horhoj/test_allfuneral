import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { SLICE_NAME } from './types';

export const auth = createAsyncThunk(`${SLICE_NAME}/auth`, async () => {
  return api.auth.getToken();
});
