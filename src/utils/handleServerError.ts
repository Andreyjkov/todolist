import { ROUTS } from '@constants/routsPath';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServerError = (error: any) => {
  if (error.response) {
    if (error.response.status === 403) {
      window.location.href = ROUTS.ERROR_PAGE;
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }
};
