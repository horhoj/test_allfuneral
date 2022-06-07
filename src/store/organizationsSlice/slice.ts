import { createSlice } from '@reduxjs/toolkit';
import { RequestSliceStateProperty } from '../types';
import {
  OrganizationItem,
  OrganizationItemContactItem,
} from '../../types/organizations';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../helpers';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  fetchOrganizationItemRequest: RequestSliceStateProperty<OrganizationItem>;
  fetchOrganizationItemContactItemRequest: RequestSliceStateProperty<OrganizationItemContactItem>;
  patchOrganizationItemRequest: RequestSliceStateProperty<unknown>;
  patchOrganizationItemContactItemRequest: RequestSliceStateProperty<unknown>;
  deleteImageRequest: RequestSliceStateProperty<unknown>;
  addImageRequest: RequestSliceStateProperty<unknown>;
  deleteOrganizationItemRequest: RequestSliceStateProperty<unknown>;
}

const initialState: InitialState = {
  fetchOrganizationItemRequest:
    makeRequestSliceStateProperty<OrganizationItem>(),
  fetchOrganizationItemContactItemRequest:
    makeRequestSliceStateProperty<OrganizationItemContactItem>(),
  patchOrganizationItemRequest: makeRequestSliceStateProperty<unknown>(),
  patchOrganizationItemContactItemRequest:
    makeRequestSliceStateProperty<unknown>(),
  deleteImageRequest: makeRequestSliceStateProperty<unknown>(),
  addImageRequest: makeRequestSliceStateProperty<unknown>(),
  deleteOrganizationItemRequest: makeRequestSliceStateProperty<unknown>(),
};

export const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchOrganizationItemThunk,
      'fetchOrganizationItemRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.fetchOrganizationItemContactThunk,
      'fetchOrganizationItemContactItemRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.patchOrganizationItemThunk,
      'patchOrganizationItemRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.patchOrganizationItemContactItemThunk,
      'patchOrganizationItemContactItemRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.deleteImageThunk,
      'deleteImageRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.addImageThunk,
      'addImageRequest',
    );
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.deleteOrganizationItemThunk,
      'deleteOrganizationItemRequest',
    );
  },
});
