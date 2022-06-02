import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonPropsEx extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  children: string;
}

type ButtonProps = Omit<ButtonPropsEx, 'className' | 'style'>;

export const Button: FC<ButtonProps> = ({ children, icon, ...props }) => {
  return (
    <button
      className={classNames(styles.wrap, icon && styles.bigPaddingLeft)}
      {...props}
    >
      {icon && (
        <svg>
          <use xlinkHref={`${icon}#img`} />
        </svg>
      )}
      {children}
    </button>
  );
};
