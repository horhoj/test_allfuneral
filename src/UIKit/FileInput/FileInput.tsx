import { FC, InputHTMLAttributes, useRef } from 'react';
import addIcon from '../../assets/icons/add.svg';
import { Button } from '../Button';
import styles from './FileInput.module.scss';

interface FileInputPropsEx extends InputHTMLAttributes<HTMLInputElement> {}

type FileInputProps = Omit<FileInputPropsEx, 'className' | 'style'>;

export const FileInput: FC<FileInputProps> = ({ ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddButtonClk = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.wrap}>
      <input type="file" ref={inputRef} className={styles.input} {...props} />
      <Button icon={addIcon} onClick={handleAddButtonClk}>
        ДОБАВИТЬ ИЗОБРАЖЕНИЕ
      </Button>
    </div>
  );
};
