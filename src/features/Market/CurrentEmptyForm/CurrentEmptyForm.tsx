import { FC } from 'react';
import styles from './CurrentEmptyForm.module.scss';

export const CurrentEmptyForm: FC = () => {
  return (
    <div className={styles.wrap}>Выберите пункт из списка меню маркета</div>
  );
};
