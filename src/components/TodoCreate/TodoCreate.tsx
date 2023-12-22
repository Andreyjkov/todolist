import React, { memo, useState } from 'react';

import * as styles from './TodoCreate.module.css';
import { TodoModal } from '@components/todoModal/TodoModal';
import { END_DATE_VALID, START_DATE_VALID } from '@constants/validation';
import { INPUT_TYPE } from '@constants/inputType';
import { MODAL_MODE } from '@constants/modalMode';
import { API_STATUS } from '@constants/apiStatus';
import { IValidation } from '@type/Validation';
import { ITodoData } from '@type/ITodoData';
import { useAppDispatch, useAppSelector } from '@store/hooksStore';
import { addTodoThunk, fetchTodosThunk } from '@store/todos/asyncThunk';
import { Button } from '@components/button/Button';

const validateConfigCreate: IValidation[] = [
  {
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
      pattern: {
        value: /^\d+(\.\d\d)?$/,
        message: 'No more than two decimal places',
      },
    },
  },
];

export const TodoCreate = memo(() => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const { ApiStatus } = useAppSelector((state) => state.todos);

  const handleNewTodo = async ({ value, date, price }: ITodoData) => {
    const dateNow = new Date();
    const newTodo: ITodoData = {
      value,
      date,
      price,
      id: dateNow.getTime(),
      updateDate: dateNow.toString(),
      status: false,
    };
    await dispatch(addTodoThunk(newTodo));
    if (ApiStatus !== API_STATUS.FAILED) {
      dispatch(fetchTodosThunk());
      closeModal();
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <Button color={'Green'} onClick={openModal}>
          Add task
        </Button>
      </div>
      {isOpenModal && (
        <TodoModal
          validateConfig={validateConfigCreate}
          title="Create task"
          dataModal={{} as ITodoData}
          mode={MODAL_MODE.CREATE}
          closeModal={closeModal}
          submitModal={handleNewTodo}
          isLoadingButton={ApiStatus === API_STATUS.PENDING}
        />
      )}
    </>
  );
});
