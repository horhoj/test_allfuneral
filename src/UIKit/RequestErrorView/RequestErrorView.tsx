import { FC } from 'react';
import { RequestError } from '../../store/types';
import styles from './RequestErrorView.module.scss';

interface RequestErrorViewProps {
  title: string;
  requestError: RequestError;
}

export const RequestErrorView: FC<RequestErrorViewProps> = ({
  requestError,
  title,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{title}</div>
      <div>причина: {requestError.errorMsg}</div>
    </div>
  );
};
