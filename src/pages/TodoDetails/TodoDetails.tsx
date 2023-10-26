import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as styles from './TodoDetails.module.css';
import { eventService } from '@/businessService/eventService';
import { ITodoData } from '@/type/ITodoData';
import NotFound from '@/pages/NotFound/NotFound';
import { TodoCard } from '@/components/TodoCard/TodoCard';
import { TodoModal } from '@/components/TodoModal/TodoModal';
import { END_DATE_VALID, START_DATE_VALID } from '@/constants/validation';
import { INPUT_TYPE } from '@/constants/inputType';
import { MODAL_MODE } from '@/constants/modalMode';
import { IValidation } from '@/type/Validation';
import { apiService } from '@/businessService/apiService';
import { Loading } from '@/components/Loading/Loading';
import { EVENT_NAME } from '@/constants/eventName';
import { toastService } from '@/businessService/toastService';
import { TOAST_MODE } from '@/constants/toastMode';

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
    // validations: {
    //   required: {
    //     value: true,
    //     message: 'if the task is verified, select this check box',
    //   },
    // },
  },
];

const TodoDetails = () => {
  const params = useParams();

  const [todo, setTodo] = useState<ITodoData | undefined>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const getTodo = () => {
    setIsLoading(true);
    apiService
      .getTodoById(+params.id)
      .then((data) => {
        setTodo(data);
      })
      .catch((e) => {
        setTodo({
          id: 0,
          value: e.message,
          date: '',
          updateDate: '',
          price: 0,
          status: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTodo();
    eventService.subscribeEvent(EVENT_NAME.UPDATE_TODOS, getTodo);
    return () => {
      eventService.unsubscribeEvent(EVENT_NAME.UPDATE_TODOS, getTodo);
    };
  }, []);

  const submitModal = ({ id, value, date, price, status }: ITodoData) => {
    setIsLoadingButton(true);
    const dateNow = new Date();

    const updatedTodo: ITodoData = {
      id,
      value,
      date,
      price,
      status,
      updateDate: dateNow.toString(),
    };

    apiService
      .editTodo(id, updatedTodo)
      .then(() => {
        closeModal();
        toastService.addToast(
          'task updated successfully',
          TOAST_MODE.SUCCESS,
          3000
        );
        eventService.publishEvent(EVENT_NAME.UPDATE_TODOS);
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

  if (isLoading) {
    return <Loading />;
  }
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
          isLoadingButton={isLoadingButton}
        />
      )}
    </div>
  );
};
export default TodoDetails;
