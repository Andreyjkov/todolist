import { toastService } from '@/businessService/toastService';
import { ROUTS } from '@/constants/routsPath';
import { TOAST_MODE } from '@/constants/toastMode';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServerError = (error: any) => {
  if (error.response) {
    if (error.response.status === 403) {
      window.location.href = ROUTS.FORBIDDEN;
      return Promise.reject(error);
    } else {
      toastService.addToast(error.message, TOAST_MODE.ERROR, 3000, true);
      return Promise.reject(error);
    }
  } else {
    toastService.addToast(error.message, TOAST_MODE.ERROR, 3000, true);
    return Promise.reject(error);
  }
};
