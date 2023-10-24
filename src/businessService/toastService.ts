import { TOAST_MODE } from '@/constants/toastMode';
import { IToastConfig } from '@/type/IToastConfig';
import { eventService } from './eventService';
import { EVENT_NAME } from '@/constants/eventName';

let toasts: IToastConfig[] = [];

const getToasts = (): IToastConfig[] => {
  return toasts;
};

const addToast = (message: string, mode: TOAST_MODE) => {
  const id = new Date().getTime() + toasts.length;
  toasts = [
    ...toasts,
    {
      id,
      message,
      mode,
    },
  ];
  eventService.publishEvent(EVENT_NAME.UPDATE_TOASTS);
};

const deleteToast = (id: number) => {
  toasts = toasts.filter((toast) => {
    return toast.id !== id;
  });
  eventService.publishEvent(EVENT_NAME.UPDATE_TOASTS);
};

export const toastService = {
  addToast,
  getToasts,
  deleteToast,
};
