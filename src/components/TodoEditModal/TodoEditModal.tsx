import React, { useEffect, useRef, useState } from 'react';

import styles from './TodoEditModal.module.css';
import { ITodoData } from '@/type/ITodoData';

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
  const [errors, setErrors] = useState({ inputValue: false, inputDate: false });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputDateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTodo(dataModal);
  }, []);

  const handleTodoSubmit = () => {
    if (!inputDateRef.current.value) {
      setErrors((prev) => ({ ...prev, inputDate: true }));
      return;
    }

    if (!textareaRef.current.value) {
      setErrors((prev) => ({ ...prev, inputValue: true }));
      return;
    }

    submitModal({
      ...todo,
      date: new Date(inputDateRef.current.value),
      value: textareaRef.current.value,
    });

    closeModal();
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
              className={
                errors.inputValue
                  ? `${styles.textarea} ${styles.error}`
                  : styles.textarea
              }
              defaultValue={todo?.value}
              ref={textareaRef}
              onFocus={() => {
                errors.inputValue &&
                  setErrors((prev) => ({ ...prev, inputValue: false }));
              }}
            />
          </label>

          <label className={styles.dateField_label}>
            Date:
            <br />
            <input
              className={
                errors.inputDate
                  ? `${styles.datePicker} ${styles.error}`
                  : styles.datePicker
              }
              type="datetime-local"
              step="1"
              defaultValue={dataModal.date.toISOString().split('.')[0]}
              ref={inputDateRef}
              onFocus={() => {
                errors.inputDate &&
                  setErrors((prev) => ({ ...prev, inputDate: false }));
              }}
            />
          </label>
        </div>

        <button onClick={handleTodoSubmit} className={styles.saveButton}>
          Save
        </button>
        <button onClick={closeModal} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};
