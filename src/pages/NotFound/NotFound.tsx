import React from 'react';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Page not found</h1>
        <Link to={'/'} className={styles.link}>
          go home
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
