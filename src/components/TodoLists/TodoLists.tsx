import React from "react";
import styles from "./TodoLists.module.css";

export interface ITodoData {
  id: number;
  value: string;
  date: Date;
}

interface Props {
  todosData: ITodoData[];
  deleteTodo: (id: number) => void;
}

export const TodoLists = ({ todosData, deleteTodo }: Props) => {
  return (
    <div className={styles.container}>
      {todosData?.length ? (
        <ul className={styles.listSection}>
          {todosData.map((todo) => {
            return (
              <div key={todo.id} className={styles.listRow}>
                <div className={styles.valueBox}>
                  <li className={styles.boxId}>{todo.id}</li>
                  <li className={styles.boxTodo}>{todo.value}</li>
                  <li className={styles.boxDate}>
                    {todo.date.toLocaleString()}
                  </li>
                </div>
                <button
                  className={styles.button}
                  onClick={() => deleteTodo(todo.id)}
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
