import { RequestSliceStateProperty, RootState } from '../types';
import {
  OrganizationItem,
  OrganizationItemContactItem,
} from '../../types/organizations';

export const getFetchOrganizationItemRequest = (
  state: RootState,
): RequestSliceStateProperty<OrganizationItem> =>
  state.organizations.fetchOrganizationItemRequest;

export const getFetchOrganizationItemContactItemRequest = (
  state: RootState,
): RequestSliceStateProperty<OrganizationItemContactItem> =>
  state.organizations.fetchOrganizationItemContactItemRequest;

export const getPatchOrganizationItemRequest = (
  state: RootState,
): RequestSliceStateProperty<unknown> =>
  state.organizations.patchOrganizationItemRequest;

export const getPatchOrganizationItemContactItemRequest = (
  state: RootState,
): RequestSliceStateProperty<unknown> =>
  state.organizations.patchOrganizationItemContactItemRequest;

export const getDeleteImageRequest = (
  state: RootState,
): RequestSliceStateProperty<unknown> => state.organizations.deleteImageRequest;
