import { FC } from 'react';
import classNames from 'classnames';
import styles from './Confirm.module.scss';

interface ConfirmProps {
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
  title,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  message,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.topWrap}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
      </div>
      <div className={styles.bottomWrap}>
        <button
          className={classNames(styles.button, styles.cancelButton)}
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
        <button
          className={classNames(styles.button, styles.confirmButton)}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
};
