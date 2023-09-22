import React, { memo } from "react";
import styles from "./TodoLists.module.css";
import { Link } from "react-router-dom";
import { ITodoData } from "../../type";

interface Props {
  deleteTodo: (id: number) => void;
  todos: ITodoData[];
}

export const TodoLists = memo(({ deleteTodo, todos }: Props) => {
  console.log("render TodoLists");

  return (
    <div className={styles.container}>
      {todos?.length ? (
        <ul className={styles.listSection}>
          {todos.map((todo) => {
            return (
              <div key={todo.id} className={styles.listRow}>
                <Link to={`/todo/${todo.id}`} className={styles.link}>
                  <div className={styles.valueBox}>
                    <li className={styles.boxId}>{todo.id}</li>
                    <li className={styles.boxTodo}>{todo.value}</li>
                    <li className={styles.boxDate}>
                      {todo.date.toLocaleString("ru")}
                    </li>
                  </div>
                </Link>
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
});
