import React from "react";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Page not found</h1>
      </div>
    </div>
  );
};
