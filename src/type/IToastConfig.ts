import { TOAST_MODE } from '@/constants/toastMode';

export interface IToastConfig {
  id: number;
  message: string;
  mode: TOAST_MODE;
}
