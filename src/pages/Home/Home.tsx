import React from 'react';
import * as styles from './Home.module.css';

import { TodoLists } from '@components/TodoLists/TodoLists';
import { TodoCreate } from '@components/TodoCreate/TodoCreate';
import { ToastList } from '@/components/Toast/ToastList/ToastList';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>
      <div className={styles.content}>
        <TodoCreate />
        <TodoLists />
        <ToastList />
      </div>
    </div>
  );
};
export default Home;
