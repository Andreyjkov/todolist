import React from 'react';

import * as styles from './Home.module.css';
import { TodoLists } from '@components/todoLists/TodoLists';
import { TodoCreate } from '@components/todoCreate/TodoCreate';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>
      <div className={styles.content}>
        <TodoCreate />
        <TodoLists />
      </div>
    </div>
  );
};
export default Home;
