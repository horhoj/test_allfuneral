import { FC } from 'react';
import styles from './FormErrorValidationHelper.module.scss';

export const FormErrorValidationHelper: FC = ({ children }) => {
  return <div className={styles.wrap}>{children}</div>;
};
