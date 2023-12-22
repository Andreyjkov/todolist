import React from 'react';

import { ToastList } from '@components/toast/toastList/ToastList';
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
