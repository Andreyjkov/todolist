import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from './ErrorsPage.module.css';
import { useAppSelector } from '@store/hooksStore';

const ErrorsPage = () => {
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.todos);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{error}</h1>
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
export default ErrorsPage;
