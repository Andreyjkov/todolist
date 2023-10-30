import axios from 'axios';
import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit';
import { ITodoData } from '@type/ITodoData';
import { addToast } from '../toasts/sliceToasts';
import { TOAST_MODE } from '@constants/toastMode';
import { handleServerError } from '@utils/handleServerError';

const SERVER_URL = 'http://localhost:3001/todos';

const apiClient = axios.create({
  baseURL: SERVER_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleServerError(error)
);

const handleApiError = (error: Error, dispatch: Dispatch) => {
  dispatch(
    addToast({
      message: error.message || 'An error occurred',
      mode: TOAST_MODE.ERROR,
      autoCloseDuration: 3000,
    })
  );
};

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { dispatch }): Promise<ITodoData[]> => {
    try {
      return (await apiClient.get('')).data;
    } catch (error) {
      handleApiError(error, dispatch);
      throw error;
    }
  }
);
export const addTodoThunk = createAsyncThunk(
  'todos/addTodo',
  async (newTodo: ITodoData, { dispatch }): Promise<ITodoData> => {
    try {
      return (await apiClient.post('', newTodo)).data;
    } catch (error) {
      handleApiError(error, dispatch);
      throw error;
    }
  }
);
export const editTodoThunk = createAsyncThunk(
  'todos/editTodo',
  async (updatedTodo: ITodoData, { dispatch }): Promise<ITodoData> => {
    try {
      return (await apiClient.put(`/${updatedTodo.id}`, updatedTodo)).data;
    } catch (error) {
      handleApiError(error, dispatch);
      throw error;
    }
  }
);
export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number, { dispatch }): Promise<number> => {
    try {
      (await apiClient.delete(`/${id}`)).data;
      return id;
    } catch (error) {
      handleApiError(error, dispatch);
      throw error;
    }
  }
);
export const getTodoByIdThunk = createAsyncThunk(
  'todos/getTodoById',
  async (id: number, { dispatch }) => {
    try {
      return (await apiClient.get(`/${id}`)).data;
    } catch (error) {
      handleApiError(error, dispatch);
      throw error;
    }
  }
);
