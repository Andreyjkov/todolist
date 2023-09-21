import React, { useCallback, useEffect, useState } from "react";
import styles from "./Home.module.css";

import { NewTodo, TodoLists } from "../../components";
import { businessService } from "../../businessService/businessService";

export const Home = () => {
  const [_, setTriger] = useState(false);

  const handleAddTodo = useCallback((value: string) => {
    businessService.addTodo(value);
    setTriger((prev) => !prev);
  }, []);

  const handleDeleteTodo = (id: number) => {
    businessService.deleteTodo(id);
    setTriger((prev) => !prev);
  };

  console.log("@render Home");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todo App</h1>
      </div>

      <div className={styles.content}>
        <NewTodo addTodo={handleAddTodo} />
        <TodoLists deleteTodo={handleDeleteTodo} />
      </div>
    </div>
  );
};
