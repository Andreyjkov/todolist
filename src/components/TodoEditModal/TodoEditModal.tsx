import React, { useRef } from 'react';
import dayjs from 'dayjs';

import styles from './TodoEditModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { useMyForm } from '@/hooks/useMyForm';
import { MIN_DATE_VALID } from '@/constants/validation';

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
  const { errors, validateFormData } = useMyForm();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const formData = validateFormData([
      {
        ref: textareaRef,
        validations: {
          required: true,
          minLength: 3,
          maxLength: 7,
        },
      },
      {
        ref: inputDateRef,
        validations: {
          required: true,
          min: MIN_DATE_VALID,
        },
      },
    ]);

    if (formData) {
      const newTodoData = {
        ...dataModal,
        value: formData.value,
        date: dayjs(formData.date).toDate(),
      };
      submitModal(newTodoData);
      closeModal();
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
                defaultValue={dataModal.date.toISOString().split('.')[0]}
                required={true}
                ref={inputDateRef}
                lang="en"
              />
              <span className="validity"></span>
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
