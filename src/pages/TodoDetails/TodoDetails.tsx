import React, { useEffect, useState } from "react";
import styles from "./TodoDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";
import { businessService } from "../../businessService/businessService";
import { ITodoData } from "../../type";

export const TodoDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const todos = businessService.todoStore().getState();

  const [todo, setTodo] = useState<ITodoData>();

  useEffect(() => {
    setTodo(businessService.getTodoById(todos, +params.id));
  }, [params.id]);

  if (!todo) {
    return <NotFound />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.text}>id: {todo?.id}</p>
            <p className={styles.text}>value: {todo?.value}</p>
            <p className={styles.text}>
              date: {todo?.date.toLocaleString("ru")}
            </p>
          </div>
          <button onClick={() => navigate(-1)} className={styles.cardBtn}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
