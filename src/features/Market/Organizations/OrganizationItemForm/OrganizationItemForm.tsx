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

  useEffect(() => {
    dispatch(
      organizationsSlice.thunks.fetchOrganizationItemThunk(organizationId),
    );
    return () => {
      dispatch(organizationsSlice.actions.resetFetchOrganizationItemRequest());
      dispatch(
        organizationsSlice.actions.resetFetchOrganizationItemContactItemRequest,
      );
    };
  }, []);

  const handleDeleteCurrentOrganization = () => {
    console.log('handleDeleteCurrentOrganization');
  };

  const handleUpdateDataForCurrentOrganization = () => {
    console.log('handleUpdateDataForCurrentOrganization');
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
      organizationsSlice.thunks.deleteImage({ imageName, organizationId }),
    );
  };

  const handleAddImage = (file: File) => {
    dispatch(organizationsSlice.thunks.addImage({ organizationId, file }));
  };

  return (
    <div className={styles.wrap}>
      <OrganizationItemNavBar
        onGoToOrganizationList={() => onGoTo(null)}
        onDeleteBtnClk={handleDeleteCurrentOrganization}
        onUpdateBtnClk={handleUpdateDataForCurrentOrganization}
      />
      {fetchOrganizationItemRequest.data && (
        <OrganizationItemDataView
          organizationItem={fetchOrganizationItemRequest.data}
          onPatchOrganizationItem={handlePatchOrganizationItem}
          editMode={editMode}
          setEditMode={setEditMode}
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
