import { AxiosRequestConfig } from 'axios';
import {
  OrganizationItem,
  OrganizationItemContactItem,
  OrganizationItemType,
  PhotoItem,
} from '../types/organizations';
import {
  API_DEFAULT_REQUEST_HEADERS,
  BASE_URL,
  LS_FAKE_DELETE_IMAGE_LIST,
  LS_FAKE_IMAGE_LIST,
  LS_FAKE_ORGANIZATION_ITEM_CONTACT_ITEM_DATA,
  LS_FAKE_ORGANIZATION_ITEM_DATA,
} from '../config';
import { requestExecutorCreator } from './helpers';

interface OrganizationItemPatchPayload {
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    // issue_date: string;
  };
  type: OrganizationItemType[];
}

interface OrganizationItemFakeData {
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: OrganizationItemType[];
}

interface OrganizationItemContactItemPatchPayload {
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
}

const requestExecutor = requestExecutorCreator(
  BASE_URL,
  API_DEFAULT_REQUEST_HEADERS,
);

export const fetchOrganizationItem = async (
  organizationId: string,
): Promise<OrganizationItem> => {
  const requestConfig: AxiosRequestConfig = {
    url: `/companies/${organizationId}`,
    method: 'get',
  };

  const response = await requestExecutor<OrganizationItem>(requestConfig);

  const fakeData = localStorage.getItem(LS_FAKE_ORGANIZATION_ITEM_DATA);

  let data = response.data;

  if (fakeData) {
    const fakeDataParsed = JSON.parse(fakeData) as OrganizationItemFakeData;
    data = { ...data, ...fakeDataParsed };
  }

  const fakeImageListStr = localStorage.getItem(LS_FAKE_IMAGE_LIST);

  if (fakeImageListStr) {
    const fakeImageList = JSON.parse(fakeImageListStr) as PhotoItem[];
    data = { ...data, photos: [...data.photos, ...fakeImageList] };
  }

  const fakeDeleteImageListStr = localStorage.getItem(
    LS_FAKE_DELETE_IMAGE_LIST,
  );

  if (fakeDeleteImageListStr) {
    const fakeDeleteImageList = JSON.parse(fakeDeleteImageListStr) as string[];
    const photoList: PhotoItem[] = data.photos.filter(
      (photoItem) => !fakeDeleteImageList.includes(photoItem.name),
    );
    data = { ...data, photos: [...photoList] };
  }

  return data;
};

export const fetchOrganizationItemContact = async (
  contactId: string,
): Promise<OrganizationItemContactItem> => {
  const requestConfig: AxiosRequestConfig = {
    url: `/contacts/${contactId}`,
    method: 'get',
  };

  const response = await requestExecutor<OrganizationItemContactItem>(
    requestConfig,
  );

  const fakeData = localStorage.getItem(
    LS_FAKE_ORGANIZATION_ITEM_CONTACT_ITEM_DATA,
  );

  let data = response.data;
  if (fakeData) {
    const fakeDataParsed = JSON.parse(
      fakeData,
    ) as OrganizationItemContactItemPatchPayload;
    data = { ...data, ...fakeDataParsed };
  }

  return data;
};

export const patchOrganizationItem = async (
  organizationId: string,
  organizationItem: OrganizationItem,
): Promise<unknown> => {
  const organizationItemPatchPayload: OrganizationItemPatchPayload = {
    name: organizationItem.name,
    contract: {
      no: organizationItem.contract.no,
      // issue_date: organizationItem.contract.issue_date,
    },
    businessEntity: organizationItem.businessEntity,
    type: organizationItem.type,
    shortName: organizationItem.shortName,
  };

  const requestConfig: AxiosRequestConfig = {
    url: `/companies/${organizationId}`,
    data: organizationItemPatchPayload,
    method: 'patch',
  };

  const response = await requestExecutor<unknown>(requestConfig);

  const fake_data: OrganizationItemFakeData = {
    ...organizationItemPatchPayload,
    contract: organizationItem.contract,
  };

  localStorage.setItem(
    LS_FAKE_ORGANIZATION_ITEM_DATA,
    JSON.stringify(fake_data),
  );

  return response.data;
};

export const patchOrganizationItemContact = async (
  contactId: string,
  contactData: OrganizationItemContactItem,
): Promise<unknown> => {
  const organizationItemContactItemPatchPayload: OrganizationItemContactItemPatchPayload =
    {
      email: contactData.email,
      firstname: contactData.firstname,
      lastname: contactData.lastname,
      patronymic: contactData.patronymic,
      phone: contactData.phone,
    };

  const requestConfig: AxiosRequestConfig = {
    url: `/contacts/${contactId}`,
    method: 'patch',
    data: organizationItemContactItemPatchPayload,
  };

  const response = await requestExecutor<unknown>(requestConfig);

  localStorage.setItem(
    LS_FAKE_ORGANIZATION_ITEM_CONTACT_ITEM_DATA,
    JSON.stringify(organizationItemContactItemPatchPayload),
  );

  return response.data;
};

export const deleteImage = async (
  organizationId: string,
  imageName: string,
): Promise<unknown> => {
  const requestConfig: AxiosRequestConfig = {
    url: `/companies/${organizationId}/image/${imageName}`,
    method: 'delete',
  };

  const response = await requestExecutor<unknown>(requestConfig);

  const fakeDeleteImageListStr = localStorage.getItem(
    LS_FAKE_DELETE_IMAGE_LIST,
  );

  let fakeDeleteImageList: string[] = [];
  if (fakeDeleteImageListStr) {
    fakeDeleteImageList = [...(JSON.parse(fakeDeleteImageListStr) as string[])];
  }

  fakeDeleteImageList.push(imageName);

  localStorage.setItem(
    LS_FAKE_DELETE_IMAGE_LIST,
    JSON.stringify(fakeDeleteImageList),
  );

  return response.data;
};

export const addImage = async (
  organizationId: string,
  file: File,
): Promise<unknown> => {
  const formData = new FormData();
  formData.append('file', file);
  const requestConfig: AxiosRequestConfig = {
    url: `/companies/${organizationId}/image`,
    method: 'post',
    headers: { 'Content-type': 'multipart/form-data' },
    data: formData,
  };

  const response = await requestExecutor<PhotoItem>(requestConfig);

  const fakeImageListStr = localStorage.getItem(LS_FAKE_IMAGE_LIST);
  let fakeImageList: PhotoItem[] = [];

  if (fakeImageListStr) {
    fakeImageList = [...(JSON.parse(fakeImageListStr) as PhotoItem[])];
  }

  fakeImageList.push(response.data);

  localStorage.setItem(LS_FAKE_IMAGE_LIST, JSON.stringify(fakeImageList));

  return response.data;
};

export const deleteOrganizationItem = async (
  organizationId: string,
): Promise<unknown> => {
  const requestConfig: AxiosRequestConfig = {
    url: `/companies/${organizationId}`,
    method: 'delete',
  };

  const response = await requestExecutor<unknown>(requestConfig);

  return response.data;
};

export const localeCacheClear = (): void => {
  localStorage.removeItem(LS_FAKE_ORGANIZATION_ITEM_DATA);
  localStorage.removeItem(LS_FAKE_ORGANIZATION_ITEM_CONTACT_ITEM_DATA);
  localStorage.removeItem(LS_FAKE_IMAGE_LIST);
  localStorage.removeItem(LS_FAKE_DELETE_IMAGE_LIST);
};
