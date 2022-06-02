import { FC, useState } from 'react';
import { OrganizationItem } from '../../../../types/organizations';
import { ImgButton } from '../../../../UIKit/ImgButton';
import { OrganizationItemEditMode } from '../types';
import styles from './OrganizationItemDataView.module.scss';
import { dateFormat, getOrganizationType } from './helpers';
import editImg from './../../../../assets/icons/edit.svg';
import { NameEditForm } from './NameEditForm';
import { CommonDataEditForm } from './CommonDataEditForm';

interface OrganizationItemDataViewProps {
  editMode: OrganizationItemEditMode;
  setEditMode: (mode: OrganizationItemEditMode) => void;
  organizationItem: OrganizationItem;
  onPatchOrganizationItem: (
    organizationItem: OrganizationItem,
    successCb: () => void,
  ) => void;
}

export const OrganizationItemDataView: FC<OrganizationItemDataViewProps> = ({
  organizationItem,
  onPatchOrganizationItem,
  setEditMode,
  editMode,
}) => {
  const handleNameEditFormSubmit = (values: OrganizationItem) => {
    onPatchOrganizationItem(values, () => {
      setEditMode(null);
    });
  };

  const handleCommonDataEditFormSubmit = (values: OrganizationItem) => {
    onPatchOrganizationItem(values, () => {
      setEditMode(null);
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.internalWrap}>
        {editMode === 'organizationName' ? (
          <NameEditForm
            initialValues={organizationItem}
            onSubmit={handleNameEditFormSubmit}
            onCancel={() => setEditMode(null)}
          />
        ) : (
          <div className={styles.title}>
            {organizationItem.shortName}
            <ImgButton
              src={editImg}
              alt={'editImg'}
              onClick={() => setEditMode('organizationName')}
            />
          </div>
        )}
        <div className={styles.commonDataWrap}>
          <div>
            <div className={styles.commonTitle}>
              ОБЩАЯ ИНФОРМАЦИЯ{' '}
              {editMode !== 'organizationCommonData' && (
                <ImgButton
                  src={editImg}
                  alt={'editImg'}
                  onClick={() => setEditMode('organizationCommonData')}
                />
              )}
            </div>
            <div className={styles.commonDataInternalWrap}>
              {editMode === 'organizationCommonData' && (
                <CommonDataEditForm
                  initialValues={organizationItem}
                  onSubmit={handleCommonDataEditFormSubmit}
                  onCancel={() => setEditMode(null)}
                />
              )}
              {editMode !== 'organizationCommonData' && (
                <ul className={styles.organizationData}>
                  <li>
                    <div>Полное название:</div>
                    <div>{organizationItem.name}</div>
                  </li>
                  <li>
                    <div>Договор:</div>
                    <div>
                      {`${organizationItem.contract.no} от ${dateFormat(
                        organizationItem.contract.issue_date,
                      )}`}
                    </div>
                  </li>
                  <li>
                    <div>Форма:</div>
                    <div>{organizationItem.businessEntity}</div>
                  </li>
                  <li>
                    <div>Тип:</div>
                    <div>{getOrganizationType(organizationItem.type)}</div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
