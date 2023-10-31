import React from 'react';

import { ToastList } from '@components/toast/ToastList/ToastList';
import { RootRoutes } from './routes/RootRoutes';

function App() {
  return (
    <>
      <RootRoutes />;
      <ToastList />
    </>
  );
}

export default App;
