import React, { memo, useState } from 'react';

import * as styles from './TodoCreate.module.css';
import { businessService } from '@/businessService/businessService';
import { TODO_ACTION_TYPE } from '@/constants/actionTypes';
import { END_DATE_VALID, START_DATE_VALID } from '@/constants/validation';
import { TodoModal } from '../TodoModal/TodoModal';
import { INPUT_TYPE } from '@/constants/inputType';
import { MODAL_MODE } from '@/constants/modalMode';
import { IValidation } from '@/type/Validation';
import dayjs from 'dayjs';
import { IFormData } from '@/type/IFormData';

const validateConfigCreate: IValidation[] = [
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
];

export const TodoCreate = memo(() => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const store = businessService.todoStore();

  const handleNewTodo = ({ value, date, price }: IFormData) => {
    store.dispatch({
      type: TODO_ACTION_TYPE.ADD_TODO,
      payload: { value, date: dayjs(date).toDate(), price },
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <button onClick={openModal} className={styles.button}>
        Add task
      </button>
      {isOpenModal && (
        <TodoModal
          validateConfig={validateConfigCreate}
          title="Create task"
          mode={MODAL_MODE.CREATE}
          closeModal={closeModal}
          submitModal={handleNewTodo}
        />
      )}
    </>
  );
});
