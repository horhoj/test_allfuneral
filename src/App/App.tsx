import React, { useEffect } from 'react';
import { Router } from '../router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { appSlice } from '../store/app';
import styles from './App.module.scss';
import { LeftNavBlock } from './LeftNavBlock';
import { Footer } from './Footer';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authRequest = useAppSelector(appSlice.selectors.getAuthRequest);

  useEffect(() => {
    dispatch(appSlice.thunks.auth());
  }, []);
  if (authRequest.isLoading) {
    return <div>Получение токена</div>;
  }

  return (
    <>
      <Spinner />
      <div className={styles.wrap}>
        <div className={styles.content}>
          <nav>
            <LeftNavBlock />
          </nav>
          <main className={styles.main}>
            <Router />
          </main>
        </div>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
};
