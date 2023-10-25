import React from 'react';
import { RootRoutes } from '@/routes/RootRoutes';
import { ToastList } from './components/Toast/ToastList/ToastList';

function App() {
  return (
    <>
      <RootRoutes />
      <ToastList />
    </>
  );
}

export default App;
