import React from 'react';

import * as styles from './ToastList.module.css';
import { useAppDispatch, useAppSelector } from '@store/hooksStore';
import { deleteToast } from '@store/toasts/sliceToasts';
import { Toast } from '../toast/Toast';

export const ToastList = () => {
  const { toasts } = useAppSelector((state) => state.toasts);
  const dispatch = useAppDispatch();

  const removeToast = (id: number) => {
    dispatch(deleteToast(id));
  };

  return (
    toasts?.length > 0 && (
      <div className={`${styles.toastList}`}>
        {toasts.map((toast) => (
          <Toast toast={toast} removeToast={removeToast} key={toast.id} />
        ))}
      </div>
    )
  );
};
