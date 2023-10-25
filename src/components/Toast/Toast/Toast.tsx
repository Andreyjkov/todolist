import React from 'react';
import * as styles from './Toast.module.css';
import { TOAST_MODE } from '@/constants/toastMode';
import { SuccessIcon } from '@/components/Icons/SuccessIcon';
import { WarningIcon } from '@/components/Icons/WarningIcon';
import { ErrorIcon } from '@/components/Icons/ErrorIcon';

interface IProps {
  message: string;
  mode: TOAST_MODE;
  removeToast: () => void;
}

export const Toast = ({ message, mode, removeToast }: IProps) => {
  const iconsMap = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  return (
    <div className={`${styles.toast} ${styles.show}`}>
      <div className={styles.message}>
        {mode ? <div>{iconsMap[mode]}</div> : null}
        <p className={styles.title}>{message}</p>
      </div>
      <span className={styles.close} onClick={removeToast}>
        &times;
      </span>
    </div>
  );
};
