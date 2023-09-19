import React, { useCallback, useState } from "react";
import styles from "./Home.module.css";

import { ITodoData, NewTodo, TodoLists } from "../../components";

export const Home = () => {
  const [todosData, setTodosData] = useState<ITodoData[]>([]);

  const addTodo = useCallback((value: string) => {
    const date = new Date();

    const objDataTodo = {
      id: date.getTime(),
      value: value,
      date: date,
    };

    setTodosData((prev) => [...prev, objDataTodo]);
  }, []);

  const deleteTodo = (id: number) => {
    const newTodos = todosData.filter((todo) => {
      return todo.id !== id;
    });
    setTodosData(newTodos);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>

      <div className={styles.content}>
        <NewTodo addTodo={addTodo} />
        <TodoLists todosData={todosData} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};
