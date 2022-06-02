import { FC, useState } from 'react';
import { PhotoItem } from '../../../../../types/organizations';
import deleteIcon from '../../../../../assets/icons/delete.svg';
import { ImgButton } from '../../../../../UIKit/ImgButton';
import { Confirm } from '../../../../../UIKit/Confirm';
import { ModalWindow } from '../../../../../UIKit/ModalWindow';
import styles from './Card.module.scss';

interface CardProps {
  photoItem: PhotoItem;
  onDelete: (imageName: string) => void;
}

export const Card: FC<CardProps> = ({ photoItem, onDelete }) => {
  const [isShowDeleteConfirm, setIsShowDeleteConfirm] =
    useState<boolean>(false);

  return (
    <>
      <ModalWindow
        isShowModal={isShowDeleteConfirm}
        handleModalClose={() => {
          setIsShowDeleteConfirm(false);
        }}
      >
        <Confirm
          title={'Подтвердите удаление'}
          message={'Удалить загруженное изображение?'}
          cancelLabel={'Отмена'}
          confirmLabel={'Удалить'}
          onConfirm={() => {
            setIsShowDeleteConfirm(false);
            onDelete(photoItem.name);
          }}
          onCancel={() => {
            setIsShowDeleteConfirm(false);
          }}
        />
      </ModalWindow>
      <div className={styles.wrap}>
        <div className={styles.imgWrap}>
          <img src={photoItem.thumbpath} alt={photoItem.name} />
          <div className={styles.imgDeleteBtnWrap} unselectable={'on'}>
            <ImgButton
              src={deleteIcon}
              alt={'delete image'}
              width={30}
              height={30}
              onClick={() => setIsShowDeleteConfirm(true)}
            />
          </div>
        </div>
        <div className={styles.title}>{photoItem.name}</div>
        <div className={styles.date}>
          {new Date().toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>
    </>
  );
};
