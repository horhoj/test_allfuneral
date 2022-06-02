import { FC } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import {
  CURRENT_ORGANIZATION_LIST,
  CURRENT_SEARCH_PARAM_NAME,
  ORGANIZATION_ITEM_ID,
} from '../../const';
import { OrganizationItemForm } from '../OrganizationItemForm';
import { OrganizationList } from '../OrganizationList';
import styles from './OrganizationMainForm.module.scss';

export const OrganizationMainForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const organizationId = searchParams.get(ORGANIZATION_ITEM_ID);

  const handleGoTo = (id: string | null) => {
    const newSearchParams: URLSearchParamsInit = {
      [CURRENT_SEARCH_PARAM_NAME]: CURRENT_ORGANIZATION_LIST,
    };

    if (id) {
      newSearchParams[ORGANIZATION_ITEM_ID] = id;
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div className={styles.wrap}>
      {organizationId && (
        <OrganizationItemForm
          organizationId={organizationId}
          onGoTo={handleGoTo}
        />
      )}
      {organizationId === null && <OrganizationList onGoTo={handleGoTo} />}
    </div>
  );
};
