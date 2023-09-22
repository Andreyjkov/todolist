import React, { useCallback, useEffect, useState } from "react";
import styles from "./Home.module.css";

import { NewTodo, TodoLists } from "../../components";
import { businessService } from "../../businessService/businessService";

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const store = businessService.createStore();

  useEffect(() => {
    setTodos(store.getState());
  }, []);

  const handleAddTodo = (value: string) => {
    store.dispatch({ type: "ADD_TODO", value });

    const data = store.getState();
    setTodos(data);
  };

  const handleDeleteTodo = (id: number) => {
    store.dispatch({ type: "DELETE_TODO", id });

    const data = store.getState();
    setTodos(data);
  };

  console.log("render Home");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>

      <div className={styles.content}>
        <NewTodo addTodo={handleAddTodo} />
        <TodoLists deleteTodo={handleDeleteTodo} todos={todos} />
      </div>
    </div>
  );
};
