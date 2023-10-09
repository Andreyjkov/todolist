import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';

import styles from './TodoEditModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { validateFormData } from '@/utils/validateFormData';
import { DATE_FORMAT } from '@/constants/dateFormat';
import { IErrorsObj } from '@/type/Validation';
import { END_DATE_VALID, START_DATE_VALID } from '@/constants/validation';

interface IProps {
  closeModal: () => void;
  submitModal: (todo: ITodoData) => void;
  dataModal: ITodoData;
}

export const TodoEditModal = ({
  submitModal,
  closeModal,
  dataModal,
}: IProps) => {
  const [errors, setErrors] = useState<IErrorsObj | null>();

  const todoValueRef = useRef<HTMLTextAreaElement | null>(null);
  const todoDateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const formData = {
      todoValue: todoValueRef.current.value,
      todoDate: todoDateRef.current.value,
    };

    const errorsObj = validateFormData(formData, [
      {
        name: 'todoValue',
        type: 'textarea',
        validations: {
          required: true,
          minLength: { value: 5 },
          maxLength: { value: 20 },
        },
      },

      {
        name: 'todoDate',
        type: 'datetime-local',
        validations: {
          required: true,
          min: {
            value: START_DATE_VALID,
          },
          max: {
            value: END_DATE_VALID,
          },
        },
      },
    ]);

    if (Object.keys(errorsObj).length === 0) {
      setErrors(null);

      const newTodoData = {
        ...dataModal,
        value: todoValueRef.current.value,
        date: dayjs(todoDateRef.current.value).toDate(),
      };

      submitModal(newTodoData);
      closeModal();
    } else {
      setErrors(errorsObj);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={closeModal}>
          &times;
        </span>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit todo</h1>
        </div>

        <div className={styles.editSection}>
          <label>
            todo Value:
            <br />
            <textarea
              rows={4}
              className={`${styles.textarea} ${
                errors?.todoValue ? styles.borderError : ''
              }`}
              defaultValue={dataModal.value}
              ref={todoValueRef}
            />
            {errors?.todoValue ? (
              <ErrorMessage errors={errors.todoValue} />
            ) : null}
          </label>

          <label className={styles.datePicker__label}>
            todo Date:
            <br />
            <div>
              <input
                className={`${styles.datePicker} ${
                  errors?.todoDate ? styles.borderError : ''
                }`}
                name="inputTypeDatetimeLocal"
                type="datetime-local"
                defaultValue={dayjs(dataModal.date).format(DATE_FORMAT)}
                required={true}
                ref={todoDateRef}
                step="1"
                lang="en"
              />
            </div>
            {errors?.todoDate ? (
              <ErrorMessage errors={errors.todoDate} />
            ) : null}
          </label>
        </div>

        <button onClick={handleSubmit} className={styles.saveButton}>
          Save
        </button>
        <button onClick={closeModal} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

interface IErrorMessageProps {
  errors: string[];
}

const ErrorMessage = ({ errors }: IErrorMessageProps) => {
  return errors.length ? (
    errors.map((error, i) => {
      return (
        <div className={styles.error} key={i}>
          {error}
        </div>
      );
    })
  ) : (
    <></>
  );
};
