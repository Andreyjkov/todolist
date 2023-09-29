import React, { useEffect, useRef, useState } from 'react';
import styles from './EditTodoModal.module.css';
import { ITodoData } from '../../type';

interface IProps {
  closeModal: () => void;
  submitModal: (todo: ITodoData) => void;
  dataModal: ITodoData;
}

export const EditTodoModal = ({
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

    const date = new Date(inputDateRef.current.value);
    const value = textareaRef.current.value;
    const modifiedTodo = { ...todo, date, value };

    setTodo(modifiedTodo);
    submitModal(modifiedTodo);
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
            Edit value:
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

          <label className={styles.dateField__label}>
            date:
            <br />
            <input
              className={
                errors.inputDate
                  ? `${styles.datePicker} ${styles.error}`
                  : styles.datePicker
              }
              type="datetime-local"
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
