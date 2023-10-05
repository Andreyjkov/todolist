import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';

import styles from './TodoEditModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { END_DATE_VALID, START_DATE_VALID } from '@/constants/validation';
import { validateFormData } from '@/utils/validateFormData';
import { patterns } from '@/constants/pattern';
import { DATE_FORMAT } from '@/constants/dateFormat';
import { IErrorsObj } from '@/type/Validation';

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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    // Path, vakidations, type;
    // {
    //   path ,
    //   type,
    //   validations
    // }
    const errorsObj = validateFormData([
      {
        ref: textareaRef,

        validations: {
          required: true,
          minLength: { value: 3 },
          maxLength: { value: 7 },
        },
      },
      {
        ref: inputDateRef,
        validations: {
          required: true,
          min: {
            value: START_DATE_VALID,
          },
          max: { value: END_DATE_VALID },
          pattern: {
            value: patterns.dateTimePattern,
            message: 'Date does not match pattern',
          },
        },
      },
    ]);

    if (Object.keys(errorsObj).length === 0) {
      setErrors(null);

      const newTodoData = {
        ...dataModal,
        value: textareaRef.current.value,
        date: dayjs(inputDateRef.current.value).toDate(),
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
            Value:
            <br />
            <textarea
              name="value"
              rows={4}
              className={
                errors?.value
                  ? `${styles.textarea} ${styles.borderError}`
                  : styles.textarea
              }
              defaultValue={dataModal.value}
              ref={textareaRef}
            />
            {errors?.value ? <ErrorMessage errors={errors.value} /> : null}
          </label>

          <label className={styles.datePicker__label}>
            Date:
            <br />
            <div>
              <input
                className={
                  errors?.date
                    ? `${styles.datePicker} ${styles.borderError}`
                    : styles.datePicker
                }
                type="datetime-local"
                step="1"
                name="date"
                defaultValue={dayjs(dataModal.date).format(DATE_FORMAT)}
                required={true}
                ref={inputDateRef}
                lang="en"
              />
            </div>
            {errors?.date ? <ErrorMessage errors={errors.date} /> : null}
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
