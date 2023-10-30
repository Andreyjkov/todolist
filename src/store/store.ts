import { configureStore } from '@reduxjs/toolkit';
import sliceToasts from './toasts/sliceToasts';
import sliceTodos from './todos/sliceTodos';

export const store = configureStore({
  reducer: {
    toasts: sliceToasts,
    todos: sliceTodos,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
