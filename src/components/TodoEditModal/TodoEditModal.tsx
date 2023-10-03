import React, { useEffect, useRef, useState } from 'react';

import styles from './TodoEditModal.module.css';
import { ITodoData } from '@/type/ITodoData';
import { todoValidation } from '@/utils/todoValidation';

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
  const [todo, setTodo] = useState<ITodoData | undefined>();

  const [errMsg, setErrMsg] = useState<{ [key: string]: string }>({
    value: '',
    date: '',
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTodo(dataModal);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;

    const obj = todoValidation({
      [key]: e.target.value,
    });

    const val = obj[key];
    if (val) {
      setErrMsg({ ...errMsg, [key]: val });
    } else {
      errMsg[key] && setErrMsg({ ...errMsg, [key]: '' });
    }
  };

  const handleSubmit = () => {
    if (Object.values(errMsg).every((value) => value === '')) {
      submitModal({
        ...todo,
        date: new Date(inputDateRef.current.value),
        value: textareaRef.current.value,
      });
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
                errMsg.value
                  ? `${styles.textarea} ${styles.borderError}`
                  : styles.textarea
              }
              defaultValue={dataModal.value}
              onChange={(e) => handleChange(e)}
              ref={textareaRef}
            />
            {errMsg.value && <div className={styles.error}>{errMsg.value}</div>}
          </label>

          <label className={styles.datePicker__label}>
            Date:
            <br />
            <div>
              <input
                className={
                  errMsg.date
                    ? `${styles.datePicker} ${styles.borderError}`
                    : styles.datePicker
                }
                type="datetime-local"
                step="1"
                name="date"
                min="1986-01-01T00:00"
                max="2100-01-01T00:00"
                onChange={(e) => handleChange(e)}
                defaultValue={dataModal.date.toISOString().split('.')[0]}
                required={true}
                ref={inputDateRef}
              />
              <span className="validity"></span>
            </div>
            {errMsg.date && <div className={styles.error}>{errMsg.date}</div>}
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
