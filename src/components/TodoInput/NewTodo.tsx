import React, { useState, memo } from "react";
import styles from "./NewTodo.module.css";

interface Props {
  addTodo: (value: string) => void;
}

export const NewTodo = memo(({ addTodo }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(value);
    setValue("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="todo"
          value={value}
          placeholder="Ceate a new todo"
          onChange={(e) => setValue(e.target.value)}
          className={styles.inputTodo}
        />
        <button type="submit" className={styles.button} disabled={!value}>
          Add
        </button>
      </form>
    </div>
  );
});
