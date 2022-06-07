import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath } from '../../router';
import homeIcon from '../../assets/icons/bar-icon__home.svg';
import marketIcon from '../../assets/icons/bar-icon__market.svg';
import searchIcon from '../../assets/icons/bar-icon__search.svg';
import settingsIcon from '../../assets/icons/bar-icon__settings.svg';
import chatIcon from '../../assets/icons/bar-icon__chat.svg';
import exitIcon from '../../assets/icons/bar-icon__exit.svg';
import styles from './LeftNavBlock.module.scss';

export const LeftNavBlock: FC = () => {
  return (
    <div className={styles.wrap}>
      <div>
        <NavLink
          to={getRoutePath('HomePage')}
          className={styles.link}
          title={'Домой'}
        >
          <img src={homeIcon} alt="homeIcon" />
        </NavLink>
        <NavLink
          to={getRoutePath('MarketPage')}
          className={styles.link}
          title={'Маркет'}
        >
          <img src={marketIcon} alt={'marketIcon'} />
        </NavLink>
        <NavLink
          to={getRoutePath('SearchPage')}
          className={styles.link}
          title={'Поиск'}
        >
          <img src={searchIcon} alt={'searchIcon'} />
        </NavLink>
      </div>
      <div>
        <NavLink
          to={getRoutePath('SettingsPage')}
          className={styles.link}
          title={'Настройки'}
        >
          <img src={settingsIcon} alt={'settingsIcon'} />
        </NavLink>
        <NavLink
          to={getRoutePath('ChatPage')}
          className={styles.link}
          title={'Чат'}
        >
          <img src={chatIcon} alt={'chatIcon'} />
        </NavLink>
        <button
          className={styles.link}
          title={'Выход'}
          onClick={() => {
            alert('Кнопка выхода из системы');
          }}
        >
          <img src={exitIcon} alt={'exitIcon'} />
        </button>
      </div>
    </div>
  );
};
