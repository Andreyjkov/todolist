import React, { useEffect, useState } from "react";
import styles from "./TodoLists.module.css";
import { Link } from "react-router-dom";
import {
  ITodoData,
  businessService,
} from "../../businessService/businessService";

interface Props {
  deleteTodo: (id: number) => void;
}

export const TodoLists = ({ deleteTodo }: Props) => {
  const [todosData, setTodosData] = useState<ITodoData[]>([]);

  useEffect(() => {
    setTodosData(businessService.getTodos());
  }, [deleteTodo]);

  console.log("@render TodoLists");

  return (
    <div className={styles.container}>
      {todosData?.length ? (
        <ul className={styles.listSection}>
          {todosData.map((todo) => {
            return (
              <div key={todo.id} className={styles.listRow}>
                <Link
                  to={`/todo/${todo.id}`}
                  state={todo}
                  className={styles.link}
                >
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
};
