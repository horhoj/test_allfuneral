import { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputPropsEx extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

type InputProps = Omit<InputPropsEx, 'className' | 'style'>;

export const Input: FC<InputProps> = ({ title, ...props }) => {
  return (
    <div className={styles.wrap}>
      {title && <div className={styles.title}>{title}</div>}
      <input className={styles.input} {...props} />
    </div>
  );
};
