import { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DEFAULT_PATH } from '../config';
import { routeList, routeNameList } from './routeList';
import { RedirectExecutor } from './RedirectExecutor';

export const Router: FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to={DEFAULT_PATH} />} />
        {routeNameList.map((routeName) => {
          const route = routeList[routeName];
          return (
            <Route
              path={route.path}
              key={routeName}
              element={<route.component />}
            />
          );
        })}
      </Routes>
      <RedirectExecutor />
    </>
  );
};
