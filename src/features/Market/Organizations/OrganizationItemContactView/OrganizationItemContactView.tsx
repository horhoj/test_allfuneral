import { FC } from 'react';
import { OrganizationItemContactItem } from '../../../../types/organizations';
import { ImgButton } from '../../../../UIKit/ImgButton';
import { OrganizationItemEditMode } from '../types';
import styles from './OrganizationItemContactView.module.scss';
import editImg from './../../../../assets/icons/edit.svg';
import { EditForm } from './EditForm';

interface OrganizationItemContactProps {
  organizationItemContactItem: OrganizationItemContactItem;
  editMode: OrganizationItemEditMode;
  setEditMode: (mode: OrganizationItemEditMode) => void;
  onPatchOrganizationItemContactItem: (
    contactId: string,
    contactData: OrganizationItemContactItem,
    successCb: () => void,
  ) => void;
}

const numberValueReduced = (phone: string) => {
  return phone
    .substring(1)
    .replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
};

export const OrganizationItemContactView: FC<OrganizationItemContactProps> = ({
  organizationItemContactItem,
  editMode,
  setEditMode,
  onPatchOrganizationItemContactItem,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.internalWrap}>
        <div className={styles.commonTitle}>
          КОНТАКТНЫЕ ДАННЫЕ{' '}
          {editMode !== 'contact' && (
            <ImgButton
              src={editImg}
              alt={'editImg'}
              onClick={() => {
                setEditMode('contact');
              }}
            />
          )}
        </div>
        <div className={styles.organizationDataWrap}>
          {editMode === 'contact' && (
            <EditForm
              initialValues={organizationItemContactItem}
              onCancel={() => {
                setEditMode(null);
              }}
              onSubmit={(values) => {
                onPatchOrganizationItemContactItem(
                  organizationItemContactItem.id,
                  values,
                  () => setEditMode(null),
                );
              }}
            />
          )}
          {editMode !== 'contact' && (
            <ul className={styles.organizationData}>
              <li>
                <div>ФИО:</div>
                <div>
                  {organizationItemContactItem.lastname}{' '}
                  {organizationItemContactItem.firstname}{' '}
                  {organizationItemContactItem.patronymic}
                </div>
              </li>
              <li>
                <div>Телефон:</div>
                <div>
                  {numberValueReduced(organizationItemContactItem.phone)}
                </div>
              </li>
              <li>
                <div>Эл. почта:</div>
                <div>
                  <a href={`mailto:${organizationItemContactItem.email}`}>
                    {organizationItemContactItem.email}
                  </a>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
