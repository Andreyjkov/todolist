import React from 'react';
import * as styles from './Toast.module.css';
import { TOAST_MODE } from '@/constants/toastMode';

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

const ErrorIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929L7.58579 9L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L9 7.58579L12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L10.4142 9L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9 10.4142L5.70711 13.7071C5.31658 14.0976 4.68342 14.0976 4.29289 13.7071Z"
        fill="#FF0000"
      />
    </svg>
  );
};
const SuccessIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM16.7682 9.64018C17.1218 9.21591 17.0645 8.58534 16.6402 8.23178C16.2159 7.87821 15.5853 7.93554 15.2318 8.35982L11.6338 12.6774C11.2871 13.0934 11.0922 13.3238 10.9366 13.4653L10.9306 13.4707L10.9242 13.4659C10.7564 13.339 10.5415 13.1272 10.1585 12.7443L8.70711 11.2929C8.31658 10.9024 7.68342 10.9024 7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L8.74428 14.1585L8.78511 14.1993L8.78512 14.1993C9.11161 14.526 9.4257 14.8402 9.71794 15.0611C10.0453 15.3087 10.474 15.5415 11.0234 15.5165C11.5728 15.4916 11.9787 15.221 12.2823 14.9448C12.5534 14.6983 12.8377 14.3569 13.1333 14.0021L13.1333 14.0021L13.1703 13.9577L16.7682 9.64018Z"
        fill="green"
      />
    </svg>
  );
};
const WarningIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM13 17V11H11V17H13Z"
        fill="#FFA500"
      />
    </svg>
  );
};
