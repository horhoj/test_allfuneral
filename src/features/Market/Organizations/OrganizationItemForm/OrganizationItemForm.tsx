import { FC, useEffect, useState } from 'react';
import { OrganizationItemNavBar } from '../OrganizationItemNavBar';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { organizationsSlice } from '../../../../store/organizationsSlice';
import { OrganizationItemDataView } from '../OrganizationItemDataView';
import { OrganizationItemContactView } from '../OrganizationItemContactView';
import {
  OrganizationItem,
  OrganizationItemContactItem,
} from '../../../../types/organizations';
import { OrganizationItemEditMode } from '../types';
import { OrganizationItemImageList } from '../OrganizationItemImageList';
import { getRoutePath } from '../../../../router';
import {
  CURRENT_ORGANIZATION_LIST,
  CURRENT_SEARCH_PARAM_NAME,
} from '../../const';
import { appSlice } from '../../../../store/app';
import { RequestErrorView } from '../../../../UIKit/RequestErrorView';
import styles from './OrganizationItemForm.module.scss';

interface OrganizationItemSubFormProps {
  organizationId: string;
  onGoTo: (id: string | null) => void;
}

export const OrganizationItemForm: FC<OrganizationItemSubFormProps> = ({
  organizationId,
  onGoTo,
}) => {
  const [editMode, setEditMode] = useState<OrganizationItemEditMode>(null);

  const dispatch = useAppDispatch();
  const fetchOrganizationItemRequest = useAppSelector(
    organizationsSlice.selectors.getFetchOrganizationItemRequest,
  );

  const fetchOrganizationItemContactItemRequest = useAppSelector(
    organizationsSlice.selectors.getFetchOrganizationItemContactItemRequest,
  );

  const patchOrganizationItemRequest = useAppSelector(
    organizationsSlice.selectors.getPatchOrganizationItemRequest,
  );

  const patchOrganizationItemContactItemRequest = useAppSelector(
    organizationsSlice.selectors.getPatchOrganizationItemContactItemRequest,
  );

  const deleteImageRequest = useAppSelector(
    organizationsSlice.selectors.getDeleteImageRequest,
  );

  const addImageRequest = useAppSelector(
    organizationsSlice.selectors.getAddImageRequest,
  );

  const deleteOrganizationItemRequest = useAppSelector(
    organizationsSlice.selectors.getDeleteOrganizationItemRequest,
  );

  useEffect(() => {
    setEditMode(null);
    dispatch(
      organizationsSlice.thunks.fetchOrganizationItemThunk(organizationId),
    );
    return () => {
      dispatch(organizationsSlice.actions.reset());
    };
  }, []);

  const handleDeleteCurrentOrganization = () => {
    const successCb = () => {
      const path = `${getRoutePath(
        'MarketPage',
      )}?${CURRENT_SEARCH_PARAM_NAME}=${CURRENT_ORGANIZATION_LIST}`;

      dispatch(appSlice.actions.redirect(path));
    };
    dispatch(
      organizationsSlice.thunks.deleteOrganizationItemThunk({
        organizationId,
        successCb,
      }),
    );
  };

  const handleUpdateDataForCurrentOrganization = () => {
    dispatch(organizationsSlice.actions.reset());
    dispatch(
      organizationsSlice.thunks.fetchOrganizationItemThunk(organizationId),
    );
  };

  const handlePatchOrganizationItem = (
    organizationItem: OrganizationItem,
    successCb: () => void,
  ) => {
    dispatch(
      organizationsSlice.thunks.patchOrganizationItemThunk({
        organizationItem,
        organizationId,
        successCb,
      }),
    );
  };

  const handlePatchOrganizationItemContactItem = (
    contactId: string,
    contactData: OrganizationItemContactItem,
    successCb: () => void,
  ) => {
    dispatch(
      organizationsSlice.thunks.patchOrganizationItemContactItemThunk({
        contactId,
        contactData,
        successCb,
      }),
    );
  };

  const handleDeleteImage = (imageName: string) => {
    dispatch(
      organizationsSlice.thunks.deleteImageThunk({ imageName, organizationId }),
    );
  };

  const handleAddImage = (file: File) => {
    dispatch(organizationsSlice.thunks.addImageThunk({ organizationId, file }));
  };

  return (
    <div className={styles.wrap}>
      <OrganizationItemNavBar
        onGoToOrganizationList={() => onGoTo(null)}
        onDeleteBtnClk={handleDeleteCurrentOrganization}
        onUpdateBtnClk={handleUpdateDataForCurrentOrganization}
      />

      {fetchOrganizationItemRequest.error && (
        <RequestErrorView
          title={'Ошибка получения данных организации'}
          requestError={fetchOrganizationItemRequest.error}
        />
      )}
      {patchOrganizationItemRequest.error && (
        <RequestErrorView
          title={'Ошибка обновления данных организации'}
          requestError={patchOrganizationItemRequest.error}
        />
      )}
      {deleteOrganizationItemRequest.error && (
        <RequestErrorView
          title={'Ошибка удаления карточки организации'}
          requestError={deleteOrganizationItemRequest.error}
        />
      )}
      {fetchOrganizationItemRequest.data && (
        <OrganizationItemDataView
          organizationItem={fetchOrganizationItemRequest.data}
          onPatchOrganizationItem={handlePatchOrganizationItem}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}

      {fetchOrganizationItemContactItemRequest.error && (
        <RequestErrorView
          title={'Ошибка получения данных по контакту'}
          requestError={fetchOrganizationItemContactItemRequest.error}
        />
      )}
      {patchOrganizationItemContactItemRequest.error && (
        <RequestErrorView
          title={'Ошибка обновления данных по контакту'}
          requestError={patchOrganizationItemContactItemRequest.error}
        />
      )}
      {fetchOrganizationItemContactItemRequest.data && (
        <OrganizationItemContactView
          organizationItemContactItem={
            fetchOrganizationItemContactItemRequest.data
          }
          editMode={editMode}
          setEditMode={setEditMode}
          onPatchOrganizationItemContactItem={
            handlePatchOrganizationItemContactItem
          }
        />
      )}

      {deleteImageRequest.error && (
        <RequestErrorView
          title={'Ошибка удаления изображения'}
          requestError={deleteImageRequest.error}
        />
      )}
      {addImageRequest.error && (
        <RequestErrorView
          title={'Ошибка добавления изображения'}
          requestError={addImageRequest.error}
        />
      )}
      {fetchOrganizationItemRequest.data && (
        <OrganizationItemImageList
          organizationItem={fetchOrganizationItemRequest.data}
          onDelete={handleDeleteImage}
          onAddImage={handleAddImage}
        />
      )}
      {/*<pre>{JSON.stringify(organizationItemRequest, null, 2)}</pre>*/}
    </div>
  );
};
