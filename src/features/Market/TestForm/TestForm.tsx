import { FC } from 'react';
import styles from './TestForm.module.scss';

export const TestForm: FC = () => {
  return (
    <div className={styles.wrap}>
      Этот пункт меню создан исключительно для демонстрации работы навигации в
      категории МАРКЕТ
    </div>
  );
};
