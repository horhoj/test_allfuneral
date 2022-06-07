import { FC, useState } from 'react';
import backArrowImg from '../../../../assets/icons/backArrow.svg';
import linkedImg from '../../../../assets/icons/linked.svg';
import rotationImg from '../../../../assets/icons/rotation.svg';
import trashImg from '../../../../assets/icons/trash.svg';
import { ModalWindow } from '../../../../UIKit/ModalWindow';
import { Confirm } from '../../../../UIKit/Confirm';
import { ImgButton } from '../../../../UIKit/ImgButton';
import styles from './OrganizationItemNavBar.module.scss';

interface OrganizationItemNavBarProps {
  onGoToOrganizationList: () => void;
  onDeleteBtnClk: () => void;
  onUpdateBtnClk: () => void;
}

export const OrganizationItemNavBar: FC<OrganizationItemNavBarProps> = ({
  onGoToOrganizationList,
  onDeleteBtnClk,
  onUpdateBtnClk,
}) => {
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
          title={'Удалить карточку'}
          message={
            <>
              <div>Отправить карточку организации в архив?</div>
              <div>(ВСЕ ЛОКАЛЬНЫЕ ИЗМЕНЕНИЯ БУДУТ УДАЛЕНЫ!!!)</div>
            </>
          }
          cancelLabel={'Отмена'}
          confirmLabel={'Удалить'}
          onConfirm={() => {
            setIsShowDeleteConfirm(false);
            onDeleteBtnClk();
          }}
          onCancel={() => {
            setIsShowDeleteConfirm(false);
          }}
        />
      </ModalWindow>
      <div className={styles.wrap}>
        <div className={styles.leftBlock}>
          <a
            href={'./'}
            onClick={(e) => {
              e.preventDefault();
              onGoToOrganizationList();
            }}
          >
            <img src={backArrowImg} alt={'backArrow'} />
            <span>К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ</span>
          </a>
        </div>
        <div className={styles.rightIconList}>
          <ImgButton
            onClick={() => {
              alert('Не понятен функционал данной кнопки');
            }}
            src={linkedImg}
            alt={'linkedImg'}
          />

          <ImgButton
            onClick={onUpdateBtnClk}
            src={rotationImg}
            alt="rotationImg"
          />

          <ImgButton
            onClick={() => setIsShowDeleteConfirm(true)}
            src={trashImg}
            alt="trashImg"
          />
        </div>
      </div>
    </>
  );
};
