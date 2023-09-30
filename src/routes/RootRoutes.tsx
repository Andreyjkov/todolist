import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTS } from '@/constants';
import { Loading } from '@/components/Loading/Loading';
const Home = lazy(() => import('@/pages/Home/Home'));
const TodoDetails = lazy(() => import('@/pages/TodoDetails/TodoDetails'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

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
