import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTS } from '@constants/routsPath';
import { Loading } from '@components/loading/Loading';
const Home = lazy(() => import('@pages/home/Home'));
const ErrorsPage = lazy(() => import('@pages/errorsPage/ErrorsPage'));
const TodoDetails = lazy(() => import('@pages/todoDetails/TodoDetails'));
const NotFound = lazy(() => import('@pages/notFound/NotFound'));

export const RootRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTS.HOME}
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path={ROUTS.TODO_DETAILS}
        element={
          <Suspense fallback={<Loading />}>
            <TodoDetails />
          </Suspense>
        }
      />
      <Route
        path={ROUTS.ERROR_PAGE}
        element={
          <Suspense fallback={<Loading />}>
            <ErrorsPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTS.NOT_FOUND}
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
