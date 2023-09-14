import React from "react";
import styles from "./styles.module.css";

interface Props {
  lists: string[];
  deleteTodo: (text: string) => void;
}

export const TodoLists = ({ lists, deleteTodo }: Props) => {
  return (
    <>
      {lists.length > 0 ? (
        <ul>
          {lists.map((todo, i) => {
            return (
              <div key={i}>
                <li className={styles.myTest}>{todo}</li>
                <button className="delete-btn" onClick={() => deleteTodo(todo)}>
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>no task</p>
      )}
    </>
  );
};
