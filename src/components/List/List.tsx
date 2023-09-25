import React, { memo } from "react";
import styles from "./List.module.css";
import { Link } from "react-router-dom";
import { ITodoData } from "../../type";

interface Props {
  handleBtn: (id: number) => void;
  items: ITodoData[];
}

export const List = ({ handleBtn, items }: Props) => {
  console.log("render List");

  return (
    <div className={styles.container}>
      {items?.length ? (
        <ul className={styles.listSection}>
          {items.map((item) => {
            return (
              <div key={item.id} className={styles.listRow}>
                <Link to={`/todo/${item.id}`} className={styles.link}>
                  <div className={styles.valueBox}>
                    <li className={styles.boxId}>{item.id}</li>
                    <li className={styles.boxTodo}>{item.value}</li>
                    <li className={styles.boxDate}>
                      {item.date.toLocaleString("ru")}
                    </li>
                  </div>
                </Link>
                <button
                  className={styles.button}
                  onClick={() => handleBtn(item.id)}
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
