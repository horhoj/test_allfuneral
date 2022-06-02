import React, { FC } from 'react';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <div className={styles.wrap}>
      <div>© 1992 - 2020 Честный Агент © Все права защищены.</div>
      <div>8 (495) 150-21-12</div>
    </div>
  );
};
