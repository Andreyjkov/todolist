import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';

import styles from './TodoEditModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { validateFormData } from '@/utils/validateFormData';
import { patterns } from '@/constants/pattern';
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

  const inputTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDatetimeLocalRef = useRef<HTMLInputElement | null>(null);
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const inputNumberRef = useRef<HTMLInputElement | null>(null);
  const inputPassRef = useRef<HTMLInputElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);
  const inputMonthRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const formData = {
      inputTypeTextarea: inputTextareaRef.current.value,
      inputTypeDatetimeLocal: inputDatetimeLocalRef.current.value,
      inputTypeText: inputTextRef.current.value,
      inputTypeNumber: inputNumberRef.current.value,
      inputTypePass: inputPassRef.current.value,
      inputTypeDate: inputDateRef.current.value,
      inputTypeMonth: inputMonthRef.current.value,
    };

    const errorsObj = validateFormData(formData, [
      {
        name: 'inputTypeTextarea',
        type: 'textarea',
        validations: {
          required: true,
          minLength: { value: 3 },
          maxLength: { value: 7 },
          pattern: {
            value: patterns.email,
          },
        },
      },

      {
        name: 'inputTypeDatetimeLocal',
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
      {
        name: 'inputTypeText',
        type: 'text',
        validations: {
          required: true,
          minLength: { value: 3 },
          maxLength: { value: 7 },
        },
      },
      {
        name: 'inputTypeNumber',
        type: 'number',
        validations: {
          required: true,
          min: { value: 5 },
          max: { value: 15 },
        },
      },
      {
        name: 'inputTypePass',
        type: 'password',
        validations: {
          required: true,
          minLength: { value: 5 },
          maxLength: { value: 15 },
        },
      },
      {
        name: 'inputTypeDate',
        type: 'date',
        validations: {
          required: true,
          min: {
            value: '2021-01-30',
          },
          max: {
            value: '2024-01-30',
          },
        },
      },
      {
        name: 'inputTypeMonth',
        type: 'month',
        validations: {
          required: true,
          min: {
            value: '2021-01',
          },
          max: {
            value: '2024-01',
          },
        },
      },
    ]);

    if (Object.keys(errorsObj).length === 0) {
      setErrors(null);

      const newTodoData = {
        ...dataModal,
        // value: inputTextareaRef.current.value,
        date: dayjs(inputDatetimeLocalRef.current.value).toDate(),
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
            inputTypeTextarea:
            <br />
            <textarea
              name="inputTypeTextarea"
              rows={4}
              className={`${styles.textarea} ${
                errors?.inputTypeTextarea ? styles.borderError : ''
              }`}
              defaultValue={dataModal.value}
              ref={inputTextareaRef}
            />
            {errors?.inputTypeTextarea ? (
              <ErrorMessage errors={errors.inputTypeTextarea} />
            ) : null}
          </label>

          <label className={styles.datePicker__label}>
            datetime-local:
            <br />
            <div>
              <input
                className={`${styles.datePicker} ${
                  errors?.inputTypeDatetimeLocal ? styles.borderError : ''
                }`}
                name="inputTypeDatetimeLocal"
                type="datetime-local"
                defaultValue={dayjs(dataModal.date).format(DATE_FORMAT)}
                required={true}
                ref={inputDatetimeLocalRef}
                step="1"
                lang="en"
              />
            </div>
            {errors?.inputTypeDatetimeLocal ? (
              <ErrorMessage errors={errors.inputTypeDatetimeLocal} />
            ) : null}
          </label>

          <label>
            Text:
            <br />
            <input
              name="inputTypeText"
              type="text"
              className={`${styles.textarea} ${
                errors?.inputTypeText ? styles.borderError : ''
              }`}
              ref={inputTextRef}
            />
            {errors?.inputTypeText ? (
              <ErrorMessage errors={errors.inputTypeText} />
            ) : null}
          </label>

          <label>
            Number:
            <br />
            <input
              name="inputTypeNumber"
              type="number"
              className={`${styles.textarea} ${
                errors?.inputTypeNumber ? styles.borderError : ''
              }`}
              ref={inputNumberRef}
            />
            {errors?.inputTypeNumber ? (
              <ErrorMessage errors={errors.inputTypeNumber} />
            ) : null}
          </label>

          <label>
            password:
            <br />
            <input
              name="inputTypePass"
              type="password"
              className={`${styles.textarea} ${
                errors?.inputTypePass ? styles.borderError : ''
              }`}
              ref={inputPassRef}
            />
            {errors?.inputTypePass ? (
              <ErrorMessage errors={errors.inputTypePass} />
            ) : null}
          </label>

          <label>
            date:
            <br />
            <input
              ref={inputDateRef}
              name="inputTypeDate"
              type="date"
              className={`${styles.textarea} ${
                errors?.inputTypeDate ? styles.borderError : ''
              }`}
            />
            {errors?.inputTypeDate ? (
              <ErrorMessage errors={errors.inputTypeDate} />
            ) : null}
          </label>

          <label>
            month:
            <br />
            <input
              ref={inputMonthRef}
              name="inputTypeMonth"
              type="month"
              className={`${styles.textarea} ${
                errors?.inputTypeMonth ? styles.borderError : ''
              }`}
            />
            {errors?.inputTypeMonth ? (
              <ErrorMessage errors={errors.inputTypeMonth} />
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
