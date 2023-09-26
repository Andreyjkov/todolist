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

  const [todo, setTodo] = useState<ITodoData>();

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
          <div className={styles.cardContent}>
            <p className={styles.text}>id: {todo?.id}</p>
            <p className={styles.text}>value: {todo?.value}</p>
            <p className={styles.text}>
              date: {todo?.date.toLocaleString('ru')}
            </p>
          </div>
          <button
            onClick={() => navigate(ROUTS.HOME)}
            className={styles.cardBtn}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
export default TodoDetails;
