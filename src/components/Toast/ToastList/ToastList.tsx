import React, { useEffect, useState } from 'react';
import { IToastConfig } from '@/type/IToastConfig';
import * as styles from './ToastList.module.css';
import { Toast } from '../Toast/Toast';
import { toastService } from '@/businessService/toastService';
import { eventService } from '@/businessService/eventService';
import { EVENT_NAME } from '@/constants/eventName';

export const ToastList = () => {
  const [toasts, setToasts] = useState<IToastConfig[] | undefined>();

  const updateState = () => {
    setToasts(toastService.getToasts());
  };

  const removeToast = (id: number) => {
    toastService.deleteToast(id);
  };

  useEffect(() => {
    updateState();
    eventService.subscribeEvent(EVENT_NAME.UPDATE_TOASTS, updateState);
    return () => {
      eventService.unsubscribeEvent(EVENT_NAME.UPDATE_TOASTS, updateState);
    };
  }, []);

  return (
    toasts?.length > 0 && (
      <div className={`${styles.toastList}`}>
        {toasts.length &&
          toasts.map((toast) => (
            <Toast
              message={toast.message}
              mode={toast.mode}
              removeToast={() => removeToast(toast.id)}
              key={toast.id}
            />
          ))}
      </div>
    )
  );
};
