import React from 'react';

import * as styles from './List.module.css';
import { ITodoData } from '@type/ITodoData';
import dayjs from 'dayjs';
import { DATE_DISPLAY_FORMAT } from '@/constants/dateFormat';

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
                  className={styles.valueBox}
                  onClick={() => handleLinkTo(item.id)}
                >
                  <li className={styles.boxRow}>{item.id}</li>
                  <li className={styles.boxRowText}>{item.value}</li>
                  <li className={styles.boxRow}>
                    <p>Price: </p>
                    {item.price}
                    <span> RUB</span>
                  </li>
                  <li className={styles.boxRow}>
                    <p>Status:</p>
                    {item.status ? 'verified' : 'pending'}
                  </li>
                  <li className={styles.boxRow}>
                    {dayjs(item.date).format(DATE_DISPLAY_FORMAT)}
                  </li>
                  <li className={styles.boxRow}>
                    {dayjs(item.updateDate).format(DATE_DISPLAY_FORMAT)}
                  </li>
                </div>

                {!item.status && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleBtn(item)}
                  >
                    Delete
                  </button>
                )}
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
