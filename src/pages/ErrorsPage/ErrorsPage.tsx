import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from './ErrorsPage.module.css';
import { useAppSelector } from '@store/hooksStore';
import { Button } from '@components/button/Button';

const ErrorsPage = () => {
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.todos);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{error}</h1>
        <Button color="Blue" onClick={() => navigate('/', { replace: true })}>
          go home
        </Button>
      </div>
    </div>
  );
};
export default ErrorsPage;
