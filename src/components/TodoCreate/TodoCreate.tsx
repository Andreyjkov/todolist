import React, { memo, useState } from 'react';

import * as styles from './TodoCreate.module.css';
import { END_DATE_VALID, START_DATE_VALID } from '@/constants/validation';
import { TodoModal } from '../TodoModal/TodoModal';
import { INPUT_TYPE } from '@/constants/inputType';
import { MODAL_MODE } from '@/constants/modalMode';
import { IValidation } from '@/type/Validation';
import { ITodoData } from '@/type/ITodoData';
import { apiService } from '@/businessService/apiService';
import { eventService } from '@/businessService/eventService';
import { EVENT_NAME } from '@/constants/eventName';
import { toastService } from '@/businessService/toastService';
import { TOAST_MODE } from '@/constants/toastMode';

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
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleNewTodo = async ({ value, date, price }: ITodoData) => {
    setIsLoadingButton(true);
    const dateNow = new Date();
    const newTodo: ITodoData = {
      value,
      date,
      price,
      id: dateNow.getTime(),
      updateDate: dateNow.toString(),
      status: false,
    };

    apiService
      .addTodo(newTodo)
      .then(() => {
        closeModal();
        eventService.publishEvent(EVENT_NAME.UPDATE_TODOS);
        toastService.addToast(
          'task added successfully',
          TOAST_MODE.SUCCESS,
          3000
        );
      })
      .catch(() => {})
      .finally(() => setIsLoadingButton(false));
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
          dataModal={{} as ITodoData}
          mode={MODAL_MODE.CREATE}
          closeModal={closeModal}
          submitModal={handleNewTodo}
          isLoadingButton={isLoadingButton}
        />
      )}
    </>
  );
});
