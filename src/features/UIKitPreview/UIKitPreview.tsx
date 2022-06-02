import { FC, useState } from 'react';
import { ModalWindow } from '../../UIKit/ModalWindow';
import { Confirm } from '../../UIKit/Confirm';
import { Button } from '../../UIKit/Button';
import addIcon from '../../assets/icons/add.svg';
import { Input } from '../../UIKit/Input';
import { Multiselect } from '../../UIKit/Multiselect';
import styles from './UIKitPreview.module.scss';

export const UiKitPreview: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <>
      <ModalWindow
        isShowModal={isShow}
        handleModalClose={() => {
          setIsShow(false);
        }}
      >
        <Confirm
          title={'Удалить карточку'}
          message={'Отправить карточку организации в архив?'}
          confirmLabel={'УДАЛИТЬ'}
          cancelLabel={'ОТМЕНА'}
          onConfirm={() => {
            setIsShow(false);
            console.log('confirm');
          }}
          onCancel={() => {
            console.log('cancel');
            setIsShow(false);
          }}
        />
      </ModalWindow>
      <div className={styles.wrap}>
        <div>Home</div>
        <div>
          <Button icon={addIcon} onClick={() => setIsShow(true)}>
            show modal
          </Button>
        </div>
        <div>
          <Button>test button</Button>
        </div>
        <div>
          <Button icon={addIcon}>test</Button>
        </div>
        <div>
          <Input placeholder={'asdasd'} title={'asda'} />
        </div>
        <div>{/*<Multiselect />{' '}*/}</div>
      </div>
    </>
  );
};
