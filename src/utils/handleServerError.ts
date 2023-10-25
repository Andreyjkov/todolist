import { appService } from '@/businessService/appService';
import { toastService } from '@/businessService/toastService';
import { ROUTS } from '@/constants/routsPath';
import { TOAST_MODE } from '@/constants/toastMode';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServerError = (error: any) => {
  if (error.response) {
    appService.setIsForbidden(false);
    if (error.response.status === 403) {
      window.location.href = ROUTS.FORBIDDEN;
      return Promise.reject(error);
    } else if (error.response.status === 404) {
      window.location.href = ROUTS.NOT_FOUND;
      return Promise.reject(error);
    } else {
      toastService.addToast(error.message, TOAST_MODE.ERROR);
      return Promise.reject(error);
    }
  } else {
    toastService.addToast(error.message, TOAST_MODE.ERROR);
    return Promise.reject(error);
  }
};
