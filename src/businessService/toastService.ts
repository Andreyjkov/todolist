import { TOAST_MODE } from '@/constants/toastMode';
import { IToastConfig } from '@/type/IToastConfig';
import { eventService } from './eventService';
import { EVENT_NAME } from '@/constants/eventName';

let toasts: IToastConfig[] = [];

const getToasts = (): IToastConfig[] => {
  return toasts;
};

const addToast = (
  message: string,
  mode: TOAST_MODE,
  autoCloseDuration?: number,
  checkDuplicateMessages?: boolean
) => {
  if (checkDuplicateMessages && hasDuplicate(message, toasts)) return;

  const id = new Date().getTime() + toasts.length;
  toasts = [
    ...toasts,
    {
      id,
      message,
      mode,
      autoCloseDuration,
      checkDuplicateMessages,
    },
  ];

  eventService.publishEvent(EVENT_NAME.UPDATE_TOASTS);
};

const deleteToast = (id: number, timeoutId?: NodeJS.Timeout) => {
  timeoutId && clearTimeout(timeoutId);

  toasts = toasts.filter((toast) => {
    return toast.id !== id;
  });

  eventService.publishEvent(EVENT_NAME.UPDATE_TOASTS);
};

const hasDuplicate = (message: string, toasts: IToastConfig[]) => {
  return toasts.some((obj) => obj.message === message);
};

export const toastService = {
  addToast,
  getToasts,
  deleteToast,
};
