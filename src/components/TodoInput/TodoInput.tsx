import React from "react";
import styles from "./styles.module.css";

interface Props {
  todo: string;
  setTodo: (value: React.SetStateAction<string>) => void;
  addTodo: () => void;
}

export const TodoInput = ({ todo, setTodo, addTodo }: Props) => {
  return (
    <div className="">
      <input
        type="text"
        name="todo"
        value={todo}
        placeholder="Ceate a new todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className={styles.myTest} onClick={addTodo}>
        Add
      </button>
    </div>
  );
};
