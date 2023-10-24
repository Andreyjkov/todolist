import React from 'react';
import * as styles from './Forbidden.module.css';

const ForbiddenPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          403 Forbidden – You don’t have permission to access this resource
        </h1>
      </div>
    </div>
  );
};
export default ForbiddenPage;
