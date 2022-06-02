import { FC } from 'react';
import { Button } from '../../../../UIKit/Button';
import styles from './OrganizationList.module.scss';

interface OrganizationListProps {
  onGoTo: (id: string | null) => void;
}

export const OrganizationList: FC<OrganizationListProps> = ({ onGoTo }) => {
  return (
    <div className={styles.wrap}>
      <div>Список организаций</div>
      <div>
        Так как АПИ ограничен, то есть только ссылка для перехода к организации
        с ИД=12
      </div>
      <div>
        <Button onClick={() => onGoTo('12')}>
          Перейти к организации с ИД=12
        </Button>
      </div>
    </div>
  );
};
