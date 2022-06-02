import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import {
  OrganizationItem,
  OrganizationItemContactItem,
} from '../../types/organizations';
import { store } from '../store';
import { SLICE_NAME } from './types';

export const fetchOrganizationItemThunk = createAsyncThunk(
  `${SLICE_NAME}/getOrganizationItemThunk`,
  async (organizationId: string, store) => {
    const response = await api.organizations.fetchOrganizationItem(
      organizationId,
    );
    store.dispatch(fetchOrganizationItemContactThunk(response.contactId));

    return response;
  },
);

export const fetchOrganizationItemContactThunk = createAsyncThunk(
  `${SLICE_NAME}/getOrganizationItemContactThunk`,
  async (contactId: string) => {
    return api.organizations.fetchOrganizationItemContact(contactId);
  },
);

interface PatchOrganizationItemThunkPayload {
  organizationId: string;
  organizationItem: OrganizationItem;
  successCb: () => void;
}

export const patchOrganizationItemThunk = createAsyncThunk(
  `${SLICE_NAME}/patchOrganizationItemThunk`,
  async (
    {
      organizationId,
      organizationItem,
      successCb,
    }: PatchOrganizationItemThunkPayload,
    store,
  ) => {
    const response = await api.organizations.patchOrganizationItem(
      organizationId,
      organizationItem,
    );
    store.dispatch(fetchOrganizationItemThunk(organizationId));
    successCb();
    return response;
  },
);

interface PatchOrganizationItemContactItemThunkPayload {
  contactId: string;
  contactData: OrganizationItemContactItem;
  successCb: () => void;
}

export const patchOrganizationItemContactItemThunk = createAsyncThunk(
  `${SLICE_NAME}/patchOrganizationItemContactItemThunk`,
  async (
    {
      contactData,
      contactId,
      successCb,
    }: PatchOrganizationItemContactItemThunkPayload,
    store,
  ) => {
    const response = await api.organizations.patchOrganizationItemContact(
      contactId,
      contactData,
    );
    store.dispatch(fetchOrganizationItemContactThunk(contactId));
    successCb();
    return response;
  },
);

interface DeleteImageThunkPayload {
  organizationId: string;
  imageName: string;
}

export const deleteImage = createAsyncThunk(
  `${SLICE_NAME}/deleteImage`,
  async ({ imageName, organizationId }: DeleteImageThunkPayload, store) => {
    const response = await api.organizations.deleteImage(
      organizationId,
      imageName,
    );
    store.dispatch(fetchOrganizationItemThunk(organizationId));
    return response;
  },
);

interface AddImageThunkPayload {
  organizationId: string;
  file: File;
}

export const addImage = createAsyncThunk(
  `${SLICE_NAME}/addImage`,
  async ({ organizationId, file }: AddImageThunkPayload, store) => {
    const response = await api.organizations.addImage(organizationId, file);
    store.dispatch(fetchOrganizationItemThunk(organizationId));
    return response;
  },
);
