import React from 'react';
import * as styles from './Toast.module.css';
import { SuccessIcon } from '@/components/Icons/SuccessIcon';
import { WarningIcon } from '@/components/Icons/WarningIcon';
import { ErrorIcon } from '@/components/Icons/ErrorIcon';
import { IToastConfig } from '@/type/IToastConfig';

interface IProps {
  toast: IToastConfig;
  removeToast: (id: number, timeoutId?: NodeJS.Timeout) => void;
}

export const Toast = ({ toast, removeToast }: IProps) => {
  const iconsMap = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  let timeoutId: NodeJS.Timeout;
  if (toast.autoCloseDuration) {
    timeoutId = setTimeout(() => {
      removeToast(toast.id, timeoutId);
    }, toast.autoCloseDuration);
  }

  return (
    <div className={`${styles.toast} ${styles.show}`}>
      <div className={styles.message}>
        {toast.mode ? <div>{iconsMap[toast.mode]}</div> : null}
        <p className={styles.title}>{toast.message}</p>
      </div>
      <span
        className={styles.close}
        onClick={() => removeToast(toast.id, timeoutId)}
      >
        &times;
      </span>
    </div>
  );
};
