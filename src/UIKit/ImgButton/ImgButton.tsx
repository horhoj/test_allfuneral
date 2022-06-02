import { ButtonHTMLAttributes, FC, CSSProperties } from 'react';
import styles from './ImgButton.module.scss';

interface ImgButtonPropsEx extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

type ImgButtonProps = Omit<ImgButtonPropsEx, 'className' | 'style'>;

export const ImgButton: FC<ImgButtonProps> = ({
  src,
  alt,
  width,
  height,
  ...props
}) => {
  const inlineStyles: CSSProperties = {};
  if (width) {
    inlineStyles.width = `${width}px`;
  }
  if (height) {
    inlineStyles.height = `${height}px`;
  }

  return (
    <button className={styles.wrap} {...props}>
      <img src={src} alt={alt} style={inlineStyles} />
    </button>
  );
};
