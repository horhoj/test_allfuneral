import { RequestSliceStateProperty, RootState } from '../types';
import { AppRedirectUrl } from './types';

export const getRedirectUrl = (state: RootState): AppRedirectUrl | null =>
  state.app.redirectUrl;

export const getAuthRequest = (
  state: RootState,
): RequestSliceStateProperty<string> => state.app.authRequest;

export const getIsLoading = (state: RootState): boolean =>
  state.app.authRequest.isLoading;
