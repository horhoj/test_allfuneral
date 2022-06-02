import { FC, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import buildingIcon from '../../../assets/icons/building.svg';
import {
  CURRENT_ORGANIZATION_LIST,
  CURRENT_SEARCH_PARAM_NAME,
  CURRENT_TEST,
} from '../const';
import { TestForm } from '../TestForm';
import { OrganizationMainForm } from '../Organizations/OrganizationMainForm';
import { CurrentEmptyForm } from '../CurrentEmptyForm';
import styles from './MarketMainForm.module.scss';

const LINK_ACTIVE_CLASS_NAME = 'active';

export const MarketMainForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get(CURRENT_SEARCH_PARAM_NAME);

  const handleGoTo = (link: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchParams({
      [CURRENT_SEARCH_PARAM_NAME]: link,
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.navWrap}>
        <div className={styles.navTitleWrap}>
          <div className={styles.navTitlePrimary}>ЧЕСТНЫЙ АГЕНТ</div>
          <div className={styles.navTitleSecondary}>МЕНЕДЖЕР ПРОЦЕССА</div>
        </div>
        <ul className={styles.navLinkList}>
          <li>
            <a
              href={'./'}
              onClick={handleGoTo(CURRENT_ORGANIZATION_LIST)}
              className={classNames({
                [LINK_ACTIVE_CLASS_NAME]: current === CURRENT_ORGANIZATION_LIST,
              })}
            >
              <img src={buildingIcon} alt="buildingIcon" /> Организации
            </a>
          </li>
          <li>
            <a
              href={'./'}
              onClick={handleGoTo(CURRENT_TEST)}
              className={classNames({
                [LINK_ACTIVE_CLASS_NAME]: current === CURRENT_TEST,
              })}
            >
              <img src={buildingIcon} alt="buildingIcon" /> Тестовый пункт
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.contentWrap}>
        {current === null && <CurrentEmptyForm />}
        {current === CURRENT_ORGANIZATION_LIST && <OrganizationMainForm />}
        {current === CURRENT_TEST && <TestForm />}
      </div>
    </div>
  );
};
