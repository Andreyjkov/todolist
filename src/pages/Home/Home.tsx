import React from 'react';
import * as styles from './Home.module.css';

import { TodoLists } from '@components/TodoLists/TodoLists';
import { TodoCreate } from '@components/TodoCreate/TodoCreate';
import { ToastList } from '@/components/Toast/ToastList/ToastList';
import { toastService } from '@/businessService/toastService';
import { TOAST_MODE } from '@/constants/toastMode';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>
      <div className={styles.content}>
        <div>
          <button
            onClick={() => toastService.addToast('ERROR', TOAST_MODE.ERROR)}
          >
            Error
          </button>
          <button
            onClick={() => toastService.addToast('SUCCESS', TOAST_MODE.SUCCESS)}
          >
            SUCCESS
          </button>
          <button
            onClick={() => toastService.addToast('WARNING', TOAST_MODE.WARNING)}
          >
            WARNING
          </button>
        </div>
        <TodoCreate />
        <TodoLists />
        <ToastList />
      </div>
    </div>
  );
};
export default Home;
