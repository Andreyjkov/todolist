import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './TodoDetails.module.css';
import { businessService } from '@/businessService/businessService';
import { ITodoData } from '@/type/ITodoData';
import { TODO_ACTION_TYPE, TODO_EVENT_NAME } from '@/constants';
import { TodoEditModal } from '@/components/TodoEditModal/TodoEditModal';
import { EditTodoPayload } from '@/type/AddTodoPayload';
import NotFound from '@/pages/NotFound/NotFound';
import { TodoCard } from '@/components/TodoCard/TodoCard';
import { TodoEditModal1 } from '@/components/TodoEditModal1/TodoEditModal1';
import { TodoEditModal2 } from '@/components/TodoEditModal2/TodoEditModal2';

const TodoDetails = () => {
  const params = useParams();
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
  const openModal = () => {
    setIsOpenModal(true);
  };

  if (!todo) {
    return <NotFound />;
  }

  return (
    <div className={styles.сontainer}>
      <TodoCard todo={todo} openModal={openModal} />
      {isOpenModal && (
        <TodoEditModal2
          closeModal={closeModal}
          submitModal={submitModal}
          dataModal={todo}
        />
      )}
    </div>
  );
};
export default TodoDetails;
