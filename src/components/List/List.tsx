import React from 'react';
import dayjs from 'dayjs';

import * as styles from './List.module.css';
import { ITodoData } from '@type/ITodoData';
import { DATE_DISPLAY_FORMAT } from '@constants/dateFormat';

interface Props {
  handleBtn: (item: ITodoData) => void;
  items: ITodoData[] | undefined;
  handleLinkTo: (id: number) => void;
  loading: boolean;
}

export const List = ({ handleBtn, items, handleLinkTo, loading }: Props) => {
  return (
    <div className={styles.container}>
      {loading && !items?.length ? (
        <p className={styles.loadingText}>...loading</p>
      ) : items?.length ? (
        <ul className={styles.listSection}>
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className={`${styles.listRow} ${
                  loading ? styles.loadingListRow : ''
                }`}
              >
                <div
                  className={styles.valueBox}
                  onClick={() => handleLinkTo(item.id)}
                >
                  <li className={styles.boxRow}>{item.id}</li>
                  <li className={styles.boxRowText}>{item.value}</li>
                  <li className={styles.boxRow}>
                    <p>Price: </p>
                    {item.price}
                    <span> ₽</span>
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
