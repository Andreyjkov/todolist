import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as styles from './TodoDetails.module.css';
import { TodoModal } from '@components/todoModal/TodoModal';
import { TodoCard } from '@components/todoCard/TodoCard';
import { END_DATE_VALID, START_DATE_VALID } from '@constants/validation';
import { INPUT_TYPE } from '@constants/inputType';
import { MODAL_MODE } from '@constants/modalMode';
import { API_STATUS } from '@constants/apiStatus';
import { ITodoData } from '@type/ITodoData';
import { IValidation } from '@type/Validation';
import { useAppDispatch, useAppSelector } from '@store/hooksStore';
import { editTodoThunk, getTodoByIdThunk } from '@store/todos/asyncThunk';

const validateConfigEdit: IValidation[] = [
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
    path: 'status',
    type: INPUT_TYPE.CHECKBOX,
  },
];

const TodoDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { ApiStatus, todo } = useAppSelector((state) => state.todos);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getTodoByIdThunk(+params.id));
  }, []);

  const submitModal = async ({ id, value, date, price, status }: ITodoData) => {
    const dateNow = new Date();
    const updatedTodo: ITodoData = {
      id,
      value,
      date,
      price,
      status,
      updateDate: dateNow.toString(),
    };
    await dispatch(editTodoThunk(updatedTodo));

    if (ApiStatus === API_STATUS.SUCCEEDED) {
      dispatch(getTodoByIdThunk(+params.id));
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
    <div className={styles.сontainer}>
      {ApiStatus === API_STATUS.PENDING ? (
        <h1 className={styles.loading}>...loading</h1>
      ) : (
        <TodoCard
          todo={ApiStatus === API_STATUS.FAILED ? ({} as ITodoData) : todo}
          openModal={openModal}
        />
      )}
      {isOpenModal && (
        <TodoModal
          validateConfig={validateConfigEdit}
          title="Edit task"
          mode={MODAL_MODE.EDIT}
          closeModal={closeModal}
          submitModal={submitModal}
          dataModal={todo}
          isLoadingButton={ApiStatus === API_STATUS.PENDING}
        />
      )}
    </div>
  );
};

export default TodoDetails;
