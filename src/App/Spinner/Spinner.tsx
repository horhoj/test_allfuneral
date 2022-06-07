import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { organizationsSlice } from '../../store/organizationsSlice';
import { appSlice } from '../../store/app';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  const organizationDataIsLoading = useAppSelector(
    organizationsSlice.selectors.getIsLoading,
  );

  const appDataIsLoading = useAppSelector(appSlice.selectors.getIsLoading);

  const isLoading = organizationDataIsLoading || appDataIsLoading;

  return isLoading ? <div className={styles.Spinner} /> : null;
};
