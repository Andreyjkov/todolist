import React from 'react';
import styles from './Home.module.css';

import { TodoLists, CreateTodo } from '../../components';

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>

      <div className={styles.content}>
        <CreateTodo />
        <TodoLists />
      </div>
    </div>
  );
};
