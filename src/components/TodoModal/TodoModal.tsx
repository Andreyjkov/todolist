import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';

import * as styles from './TodoModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { validateFormData } from '@/utils/validateFormData';
import { DATE_FORMAT } from '@/constants/dateFormat';
import { IErrorsObj, IValidation } from '@/type/Validation';
import { INPUT_TYPE } from '@/constants/inputType';
import { MODAL_MODE } from '@/constants/modalMode';

interface IProps {
  closeModal: () => void;
  submitModal: (data: ITodoData) => void;
  title: string;
  mode: MODAL_MODE;
  validateConfig: IValidation[];
  dataModal: ITodoData;
  isLoadingButton?: boolean;
}

export const TodoModal = ({
  submitModal,
  closeModal,
  dataModal,
  title,
  mode,
  validateConfig,
  isLoadingButton,
}: IProps) => {
  const [errors, setErrors] = useState<IErrorsObj | null>();

  const inputValueRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);
  const inputPriceRef = useRef<HTMLInputElement | null>(null);
  const inputIsVerifiedRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const data: ITodoData = {
      ...dataModal,
      value: inputValueRef.current.value,
      date: inputDateRef.current.value,
      price: parseFloat(inputPriceRef?.current?.value),
      status: inputIsVerifiedRef?.current?.checked,
    };

    const errorsObj = validateFormData(data, validateConfig);

    if (Object.keys(errorsObj).length === 0) {
      setErrors(null);
      submitModal(data);
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
          <h1 className={styles.title}>{title}</h1>
        </div>

        <div className={styles.editSection}>
          <label>
            Task text:
            <br />
            <textarea
              rows={4}
              className={`${styles.textarea} ${
                errors && errors['value'] ? styles.borderError : ''
              }`}
              defaultValue={dataModal?.value}
              ref={inputValueRef}
            />
            {errors && errors['value'] ? (
              <ErrorMessage errors={errors['value']} />
            ) : null}
          </label>

          <label>
            Task date:
            <br />
            <div>
              <input
                className={`${styles.datePicker} ${
                  errors && errors['date'] ? styles.borderError : ''
                }`}
                type={INPUT_TYPE.DATETIME_LOCAL}
                defaultValue={
                  dataModal.date
                    ? dayjs(dataModal.date).format(DATE_FORMAT)
                    : ''
                }
                required={true}
                ref={inputDateRef}
                step="1"
                lang="en"
              />
            </div>
            {errors && errors['date'] ? (
              <ErrorMessage errors={errors['date']} />
            ) : null}
          </label>

          <label>
            Task price:
            <br />
            <div>
              <input
                className={`${styles.textarea} ${
                  errors && errors['price'] ? styles.borderError : ''
                }`}
                type={INPUT_TYPE.NUMBER}
                ref={inputPriceRef}
                step={1}
                defaultValue={dataModal?.price}
              />
            </div>
            {errors && errors['price'] ? (
              <ErrorMessage errors={errors['price']} />
            ) : null}
          </label>

          {mode === MODAL_MODE.EDIT ? (
            <label>
              Task status:
              <br />
              <div className={styles.checkbox}>
                <input type={INPUT_TYPE.CHECKBOX} ref={inputIsVerifiedRef} />
                <span>verified</span>
              </div>
              {errors && errors['status'] ? (
                <ErrorMessage errors={errors['status']} />
              ) : null}
            </label>
          ) : null}
        </div>

        <button
          onClick={handleSubmit}
          className={styles.saveButton}
          disabled={isLoadingButton}
        >
          {isLoadingButton ? 'loading...' : 'Save'}
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
        <div className={styles.errorText} key={i}>
          {error}
        </div>
      );
    })
  ) : (
    <></>
  );
};
