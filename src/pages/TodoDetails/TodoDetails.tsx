import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as styles from './TodoDetails.module.css';
import { businessService } from '@/businessService/businessService';
import { ITodoData } from '@/type/ITodoData';

import { EditTodoPayload } from '@/type/AddTodoPayload';
import NotFound from '@/pages/NotFound/NotFound';
import { TodoCard } from '@/components/TodoCard/TodoCard';
import { TodoModal } from '@/components/TodoModal/TodoModal';
import { TODO_EVENT_NAME } from '@/constants/eventTypes';
import { TODO_ACTION_TYPE } from '@/constants/actionTypes';
import { END_DATE_VALID, START_DATE_VALID } from '@/constants/validation';
import { INPUT_TYPE } from '@/constants/inputType';
import { MODAL_MODE } from '@/constants/modalMode';
import { IValidation } from '@/type/Validation';

const validateConfigEdit: IValidation[] = [
  {
    name: 'value',
    path: 'value',
    type: INPUT_TYPE.TEXTAREA,
    validations: {
      required: {
        value: true,
      },
      minLength: { value: 5 },
      maxLength: { value: 20 },
    },
  },
  {
    name: 'price',
    path: 'price',
    type: INPUT_TYPE.NUMBER,
    validations: {
      required: {
        value: true,
      },
      min: {
        value: 0,
      },
      max: {
        value: 10000,
      },
    },
  },
  {
    name: 'date',
    path: 'date',
    type: INPUT_TYPE.DATETIME_LOCAL,
    validations: {
      required: {
        value: true,
      },
      min: {
        value: START_DATE_VALID,
      },
      max: {
        value: END_DATE_VALID,
      },
    },
  },
  {
    name: 'status',
    path: 'status',
    type: INPUT_TYPE.CHECKBOX,
    validations: {
      required: {
        value: true,
        message: 'if the task is verified, select this check box',
      },
    },
  },
];

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

  const submitModal = (data: EditTodoPayload) => {
    store.dispatch({
      type: TODO_ACTION_TYPE.EDIT_TODO,
      payload: data,
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
        <TodoModal
          validateConfig={validateConfigEdit}
          title="Edit task"
          mode={MODAL_MODE.EDIT}
          closeModal={closeModal}
          submitModal={submitModal}
          dataModal={todo}
        />
      )}
    </div>
  );
};
export default TodoDetails;
