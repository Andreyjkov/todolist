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
  status: API_STATUS;
  error: string | null;
  todo: ITodoData;
}

const initialState: initialState = {
  todos: [] as ITodoData[],
  status: API_STATUS.PENDING,
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
        state.status = API_STATUS.SUCCEEDED;
        state.todos = action.payload;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(editTodoThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.todo = action.payload;
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          } else {
            return todo;
          }
        });
      })
      .addCase(getTodoByIdThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.todo = action.payload;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.status = API_STATUS.SUCCEEDED;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });

    builder.addMatcher(
      (action) => action.type.endsWith(`/${API_STATUS.PENDING}`),
      (state) => {
        state.status = API_STATUS.PENDING;
        state.error = null;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith(`/${API_STATUS.FAILED}`),
      (state, action) => {
        state.status = API_STATUS.FAILED;
        state.error = action.error.message;
      }
    );
  },
});

export default sliceTodos.reducer;
