import React from 'react';
import * as styles from './Forbidden.module.css';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          403 Forbidden – You don’t have permission to access this resource
        </h1>
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
export default ForbiddenPage;
