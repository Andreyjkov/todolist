import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './TodoCard.module.css';
import { ITodoData } from '@/type/ITodoData';
import { ROUTS } from '@/constants';

interface IProps {
  todo: ITodoData;
  openModal: () => void;
}

export const TodoCard = ({ todo, openModal }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo details</h1>
        <p className={styles.subTitle}>
          <span>id:</span>
          {todo?.id}
        </p>
      </div>

      <div className={styles.valueSection}>
        <p className={styles.subTitle}>
          <span>Value:</span>
        </p>
        <div className={styles.valueBox}>
          <p className={styles.valueText}>{todo?.value}</p>
        </div>
        <button className={styles.editButton} onClick={openModal}>
          {editSvg}
        </button>
      </div>

      <div className={styles.dateSection}>
        <p className={styles.subTitle}>
          <span>date: </span>
          {todo?.date.toLocaleString('ru')}
        </p>
      </div>
      <div className={styles.footer}>
        <button
          onClick={() => navigate(ROUTS.HOME)}
          className={styles.goBackButton}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

const editSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
  >
    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" />
  </svg>
);
