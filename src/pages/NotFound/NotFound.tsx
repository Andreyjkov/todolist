import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from './NotFound.module.css';
import { Button } from '@components/button/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Page not found</h1>
        <Button color="Blue" onClick={() => navigate('/', { replace: true })}>
          go home
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
