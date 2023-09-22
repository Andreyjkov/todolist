import React, { useCallback, useEffect, useState } from "react";
import styles from "./Home.module.css";

import { NewTodo, TodoLists } from "../../components";
import { businessService } from "../../businessService/businessService";

export const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(businessService.getTodos());
  }, []);

  const handleAddTodo = useCallback((value: string) => {
    businessService.addTodo(value);
    setTodos(businessService.getTodos());
  }, []);

  const handleDeleteTodo = useCallback(
    (id: number) => {
      businessService.deleteTodo(id);
      setTodos(businessService.getTodos());
    },
    [todos]
  );

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
