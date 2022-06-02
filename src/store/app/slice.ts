import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../helpers';
import { RequestSliceStateProperty } from '../types';
import { AppRedirectUrl, SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  redirectUrl: AppRedirectUrl | null;
  authRequest: RequestSliceStateProperty<string>;
}

const initialState: InitialState = {
  redirectUrl: null,
  authRequest: makeRequestSliceStateProperty<string>({ isLoading: true }),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    // в компоненте RedirectExecutor мы отслеживаем изменение
    // redirectUrl и соответственно делаем redirect
    // это нужно что бы не привязывать компоненты к роутеру
    // и была возможность делать переадресацию из redux-middleware
    // без доступа напрямую к HISTORY API
    redirect: (state, action: PayloadAction<string>) => {
      state.redirectUrl = {
        path: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(builder, thunks.auth, 'authRequest');
  },
});
