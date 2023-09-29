import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './TodoDetails.module.css';
import NotFound from '../NotFound/NotFound';
import { businessService } from '../../businessService/businessService';
import { ITodoData } from '../../type';
import { ROUTS, TODO_ACTION_TYPE, TODO_EVENT_NAME } from '../../constants';
import { EditTodoModal } from '../../components/EditTodoModal/EditTodoModal';
import { EditTodoPayload } from '../../type/AddTodoPayload';

const TodoDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const store = businessService.todoStore();

  const [todo, setTodo] = useState<ITodoData | undefined>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const updateState = () => {
    setTodo(businessService.getTodoById(+params.id));
  };

  useEffect(() => {
    updateState();

    businessService.subscribeEvent(TODO_EVENT_NAME.UPDATE_TODOS, updateState);
    return () => {
      businessService.unsubscribeEvent(
        TODO_EVENT_NAME.UPDATE_TODOS,
        updateState
      );
    };
  }, []);

  const submitModal = (todo: EditTodoPayload) => {
    store.dispatch({
      type: TODO_ACTION_TYPE.EDIT_TODO,
      payload: todo,
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  if (!todo) {
    return <NotFound />;
  }

  return (
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
            <button
              className={styles.editButton}
              onClick={() => setIsOpenModal(true)}
            >
              Edit
            </button>
          </div>
          <div className={styles.valueBox}>
            <p className={styles.valueText}>{todo?.value}</p>
          </div>
        </div>

        <div className={styles.dateSection}>
          <p className={styles.subTitle}>
            <span>date: </span>
            {todo?.date.toLocaleString('ru')}
          </p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => navigate(ROUTS.HOME)}
            className={styles.goBackButton}
          >
            Go back
          </button>
        </div>
      </div>
      {isOpenModal && (
        <EditTodoModal
          closeModal={closeModal}
          submitModal={submitModal}
          dataModal={todo}
        />
      )}
    </div>
  );
};
export default TodoDetails;
