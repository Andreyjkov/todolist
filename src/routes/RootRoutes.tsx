import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { ROUTS } from '../constants';

const TodoDetails = lazy(() => import('../pages/TodoDetails/TodoDetails'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTS.HOME} element={<Home />} />
      <Route
        path={ROUTS.TODO_DETAILS}
        element={
          <Suspense fallback={<div>...Louding</div>}>
            <TodoDetails />
          </Suspense>
        }
      />
      <Route
        path={ROUTS.NOT_FOUND}
        element={
          <Suspense fallback={<div>...Louding</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
