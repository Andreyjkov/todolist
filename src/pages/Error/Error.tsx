import React from "react";
import styles from "./Error.module.css";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";

export function Error() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Sorry, an unexpected error has occurred.
        </h1>
        <p className={styles.subTitle}>
          {
            <i>
              {(error as Error)?.message ||
                (error as { statusText?: string })?.statusText}
            </i>
          }
        </p>
      </div>
    </div>
  );
}
