import React from 'react';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Page not found</h1>
        <button
          onClick={() => navigate('/', { replace: true })}
          className={styles.button}
        >
          go home
        </button>
      </div>
    </div>
  );
};
export default NotFound;
