import React from 'react';
import * as styles from './Home.module.css';

import { TodoLists } from '@components/TodoLists/TodoLists';
import { TodoCreate } from '@components/TodoCreate/TodoCreate';
import { apiService } from '@/businessService/apiService';

const Home = () => {
  const handleGet403 = () => {
    apiService
      .get403()
      .then()
      .catch(() => {});
  };
  const handleGet404 = () => {
    apiService
      .get404()
      .then()
      .catch(() => {});
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>
      <div>
        <button onClick={handleGet403}>get 403</button>
        <button onClick={handleGet404}>get 404</button>
      </div>
      <div className={styles.content}>
        <TodoCreate />
        <TodoLists />
      </div>
    </div>
  );
};
export default Home;
