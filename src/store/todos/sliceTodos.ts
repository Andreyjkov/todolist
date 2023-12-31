import { createSlice } from '@reduxjs/toolkit';

import { ITodoData } from '@type/ITodoData';
import { API_STATUS } from '@constants/apiStatus';
import {
  addTodoThunk,
  deleteTodoThunk,
  editTodoThunk,
  fetchTodosThunk,
  getTodoByIdThunk,
} from './asyncThunk';

interface initialState {
  todos: ITodoData[];
  ApiStatus: API_STATUS;
  error: string | null;
  todo: ITodoData;
}

const initialState: initialState = {
  todos: [] as ITodoData[],
  ApiStatus: API_STATUS.PENDING,
  error: null,
  todo: {} as ITodoData,
};

const sliceTodos = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.ApiStatus = API_STATUS.SUCCEEDED;
        state.todos = action.payload;
      })
      .addCase(addTodoThunk.fulfilled, (state) => {
        state.ApiStatus = API_STATUS.SUCCEEDED;
      })
      .addCase(editTodoThunk.fulfilled, (state) => {
        state.ApiStatus = API_STATUS.SUCCEEDED;
      })
      .addCase(getTodoByIdThunk.fulfilled, (state, action) => {
        state.ApiStatus = API_STATUS.SUCCEEDED;
        state.todo = action.payload;
      })
      .addCase(deleteTodoThunk.fulfilled, (state) => {
        state.ApiStatus = API_STATUS.SUCCEEDED;
      });

    builder.addMatcher(
      (action) => action.type.endsWith(`/${API_STATUS.PENDING}`),
      (state) => {
        state.ApiStatus = API_STATUS.PENDING;
        state.error = null;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith(`/${API_STATUS.FAILED}`),
      (state, action) => {
        state.ApiStatus = API_STATUS.FAILED;
        state.error = action.error.message;
      }
    );
  },
});

export default sliceTodos.reducer;
