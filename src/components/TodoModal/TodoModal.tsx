import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';

import * as styles from './TodoModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { validateFormData } from '@/utils/validateFormData';
import { DATE_FORMAT } from '@/constants/dateFormat';
import { IErrorsObj, IValidation } from '@/type/Validation';
import { AddTodoPayload, EditTodoPayload } from '@/type/AddTodoPayload';
import { INPUT_TYPE } from '@/constants/inputType';
import { MODAL_MODE } from '@/constants/modalMode';

interface IProps {
  closeModal: () => void;
  submitModal: (todo: EditTodoPayload | AddTodoPayload) => void;
  title: string;
  mode: MODAL_MODE;
  validateConfig: IValidation[];
  dataModal?: ITodoData;
}

export const TodoModal = ({
  submitModal,
  closeModal,
  dataModal,
  title,
  mode,
  validateConfig,
}: IProps) => {
  const [errors, setErrors] = useState<IErrorsObj | null>();
  const [isCheck, setIsCheck] = useState(false);

  const inputValueRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);
  const inputPriceRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (mode === MODAL_MODE.CREATE) {
      const validateCreateData = {
        value: inputValueRef.current.value,
        date: inputDateRef.current.value,
        price: inputPriceRef.current.value,
      };

      const errorsObj = validateFormData(validateCreateData, validateConfig);

      if (Object.keys(errorsObj).length === 0) {
        setErrors(null);
        submitModal({
          value: inputValueRef.current.value.trim(),
          date: dayjs(inputDateRef.current.value).toDate(),
          price: +inputPriceRef.current.value,
        });
        closeModal();
      } else {
        setErrors(errorsObj);
      }
    } else if (mode === MODAL_MODE.EDIT) {
      const validateEditData = {
        value: inputValueRef.current.value,
        date: inputDateRef.current.value,
        price: inputPriceRef.current.value,
        status: isCheck,
      };

      const errorsObj = validateFormData(validateEditData, validateConfig);

      if (Object.keys(errorsObj).length === 0) {
        setErrors(null);

        const newTodoData = {
          id: dataModal.id,
          value: inputValueRef.current.value.trim(),
          date: dayjs(inputDateRef.current.value).toDate(),
          price: +inputPriceRef.current.value,
          status: isCheck,
        };
        submitModal(newTodoData);
        closeModal();
      } else {
        setErrors(errorsObj);
      }
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
                errors?.value ? styles.borderError : ''
              }`}
              defaultValue={dataModal?.value}
              ref={inputValueRef}
            />
            {errors?.value ? <ErrorMessage errors={errors.value} /> : null}
          </label>

          <label>
            Task date:
            <br />
            <div>
              <input
                className={`${styles.datePicker} ${
                  errors?.date ? styles.borderError : ''
                }`}
                type={INPUT_TYPE.DATETIME_LOCAL}
                defaultValue={
                  dataModal ? dayjs(dataModal.date).format(DATE_FORMAT) : ''
                }
                required={true}
                ref={inputDateRef}
                step="1"
                lang="en"
              />
            </div>
            {errors?.date ? <ErrorMessage errors={errors.date} /> : null}
          </label>

          <label>
            Task price:
            <br />
            <div>
              <input
                className={`${styles.textarea} ${
                  errors?.price ? styles.borderError : ''
                }`}
                type={INPUT_TYPE.NUMBER}
                ref={inputPriceRef}
                step={1}
                defaultValue={dataModal?.price}
              />
            </div>
            {errors?.price ? <ErrorMessage errors={errors.price} /> : null}
          </label>

          {mode === MODAL_MODE.EDIT ? (
            <label>
              Task status:
              <br />
              <div className={styles.checkbox}>
                <input
                  type={INPUT_TYPE.CHECKBOX}
                  checked={isCheck}
                  onChange={(e) => setIsCheck(e.target.checked)}
                />
                <span>verified</span>
              </div>
              {errors?.status ? <ErrorMessage errors={errors.status} /> : null}
            </label>
          ) : null}
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
        <div className={styles.errorText} key={i}>
          {error}
        </div>
      );
    })
  ) : (
    <></>
  );
};
