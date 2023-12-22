import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOAST_MODE } from '@constants/toastMode';
import { IToastConfig } from '@type/IToastConfig';

const initialState = {
  toasts: [] as IToastConfig[],
};

interface IAddToast {
  message: string;
  mode: TOAST_MODE;
  autoCloseDuration?: number;
  checkDuplicateMessages?: boolean;
}

const sliceToasts = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<IAddToast>) {
      const id = new Date().getTime() + state.toasts.length;
      state.toasts = [
        ...state.toasts,
        {
          id,
          message: action.payload.message,
          mode: action.payload.mode,
          autoCloseDuration: action.payload?.autoCloseDuration,
          checkDuplicateMessages: action.payload?.checkDuplicateMessages,
        },
      ];
    },
    deleteToast(state, action: PayloadAction<number>) {
      state.toasts = state.toasts.filter((toast) => {
        return toast.id !== action.payload;
      });
    },
  },
});

export const { addToast, deleteToast } = sliceToasts.actions;
export default sliceToasts.reducer;
