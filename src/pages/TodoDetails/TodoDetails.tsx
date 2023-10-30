import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as styles from './TodoDetails.module.css';
import { TodoCard } from '@components/TodoCard/TodoCard';
import { TodoModal } from '@components/TodoModal/TodoModal';
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
  const { status, error, todo } = useAppSelector((state) => state.todos);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getTodoByIdThunk(+params.id));
  }, []);

  const submitModal = ({ id, value, date, price, status }: ITodoData) => {
    const dateNow = new Date();
    const updatedTodo: ITodoData = {
      id,
      value,
      date,
      price,
      status,
      updateDate: dateNow.toString(),
    };
    dispatch(editTodoThunk(updatedTodo));
    closeModal();
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };

  const errorData = {
    id: -1,
    value: error,
    date: '',
    updateDate: '',
    price: 0,
    status: true,
  };

  return (
    <div className={styles.сontainer}>
      {status === API_STATUS.PENDING ? (
        <h1 className={styles.loading}>...loading</h1>
      ) : (
        <TodoCard
          todo={status === API_STATUS.FAILED ? errorData : todo}
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
          isLoadingButton={false}
        />
      )}
    </div>
  );
};
export default TodoDetails;
