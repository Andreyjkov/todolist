import React from "react";
import styles from "./TodoDetails.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export const TodoDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, date, value } = location.state;

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.text}>id: {id}</p>
            <p className={styles.text}>value: {value}</p>
            <p className={styles.text}>date: {date.toLocaleString("ru")}</p>
          </div>
          <button onClick={() => navigate(-1)} className={styles.cardBtn}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
