import React, { useEffect } from 'react';

import * as styles from './Toast.module.css';
import { SuccessIcon } from '@icons/SuccessIcon';
import { WarningIcon } from '@icons/WarningIcon';
import { ErrorIcon } from '@icons/ErrorIcon';
import { IToastConfig } from '@type/IToastConfig';

interface IProps {
  toast: IToastConfig;
  removeToast: (id: number) => void;
}

export const Toast = ({ toast, removeToast }: IProps) => {
  const iconsMap = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (toast.autoCloseDuration) {
      timeoutId = setTimeout(() => {
        removeToast(toast.id);
      }, toast.autoCloseDuration);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`${styles.toast} ${styles.show}`}>
      <div className={styles.message}>
        {toast.mode ? <div>{iconsMap[toast.mode]}</div> : null}
        <p className={styles.title}>{toast.message}</p>
      </div>
      <span className={styles.close} onClick={() => removeToast(toast.id)}>
        &times;
      </span>
    </div>
  );
};
