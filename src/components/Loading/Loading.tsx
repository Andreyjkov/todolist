import React from 'react';

import * as styles from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>loading...</h1>
      </div>
    </div>
  );
};
