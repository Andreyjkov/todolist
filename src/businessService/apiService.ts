/* eslint-disable no-console */
import axios from 'axios';
import { ITodoData } from '@/type/ITodoData';
import { TOAST_MODE } from '@/constants/toastMode';
import { toastService } from './toastService';

const SERVER_URL = 'http://localhost:3001/todos';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        toastService.addToast(error.message, TOAST_MODE.ERROR);
        return Promise.reject(error);
      } else {
        toastService.addToast(error.message, TOAST_MODE.ERROR);
        return Promise.reject(error);
      }
    } else {
      toastService.addToast(error.message, TOAST_MODE.ERROR);
      return Promise.reject(error);
    }
  }
);

const fetchTodos = async (): Promise<ITodoData[]> => {
  return (await axios.get(SERVER_URL)).data;
};

const addTodo = async (newTodo: ITodoData): Promise<ITodoData> => {
  return (await axios.post(SERVER_URL, newTodo)).data;
};

const editTodo = async (
  id: number,
  updatedTodo: ITodoData
): Promise<string> => {
  return (await axios.put(`${SERVER_URL}/${id}`, updatedTodo)).statusText;
};

const deleteTodo = async (id: number): Promise<string> => {
  return (await axios.delete(`${SERVER_URL}/${id}`)).statusText;
};

const getTodoById = async (id: number): Promise<ITodoData> => {
  return (await axios(`${SERVER_URL}/${id}`)).data;
};

export const apiService = {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  getTodoById,
};

// const promises = [
//   axios.get('http://localhost:3001/todos1'),
//   axios.get('http://localhost:3001/todos1'),
//   axios.get('http://localhost:3001/todos1'),
//   axios.get('http://localhost:3001/todos1'),
//   axios.get('http://localhost:3001/todos1'),
// ];

// Promise.allSettled(promises)
//   .then((responses) => {
//     console.log('responses', responses);
//   })
//   .catch((errors) => {
//     console.error('@errors', errors);
//   });
