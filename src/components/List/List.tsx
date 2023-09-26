import React from 'react';
import styles from './List.module.css';
import { ITodoData } from '../../type';

interface Props {
  handleBtn: (item: ITodoData) => void;
  items: ITodoData[] | undefined;
  handleLinkTo: (id: number) => void;
}

export const List = ({ handleBtn, items, handleLinkTo }: Props) => {
  return (
    <div className={styles.container}>
      {items?.length ? (
        <ul className={styles.listSection}>
          {items.map((item) => {
            return (
              <div key={item.id} className={styles.listRow}>
                <div
                  onClick={() => handleLinkTo(item.id)}
                  className={styles.link}
                >
                  <div className={styles.valueBox}>
                    <li className={styles.boxId}>{item.id}</li>
                    <li className={styles.boxTodo}>{item.value}</li>
                    <li className={styles.boxDate}>
                      {item.date.toLocaleString('ru')}
                    </li>
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => handleBtn(item)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      ) : (
        <p className={styles.noTaskText}>no task</p>
      )}
    </div>
  );
};
