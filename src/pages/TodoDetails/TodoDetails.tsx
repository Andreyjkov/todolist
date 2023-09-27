import React, { useEffect, useState } from 'react';
import styles from './TodoDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import { businessService } from '../../businessService/businessService';
import { ITodoData } from '../../type';
import { ROUTS } from '../../constants';

const TodoDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState<ITodoData | undefined>();

  useEffect(() => {
    setTodo(businessService.getTodoById(+params.id));
  }, [params.id]);

  if (!todo) {
    return <NotFound />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Todo details</h1>
            <p className={styles.subTitle}>
              <span>id:</span>
              {todo?.id}
            </p>
          </div>

          <div className={styles.valueSection}>
            <div className={styles.editBox}>
              <p>Value:</p>
              <button className={styles.cardBtn}>Edit</button>
            </div>
            <div className={styles.valueBox}>
              <p className={styles.valueText}>{todo?.value}</p>
            </div>
          </div>

          <div className={styles.dateSection}>
            <p className={styles.subTitle}>
              <span>created: </span>
              {todo?.date.toLocaleString('ru')}
            </p>
            <p className={styles.subTitle}>
              <span>updated: </span>
              {todo?.date.toLocaleString('ru')}
            </p>
          </div>
          <div className={styles.footer}>
            <button
              onClick={() => navigate(ROUTS.HOME)}
              className={styles.cardBtn}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoDetails;
