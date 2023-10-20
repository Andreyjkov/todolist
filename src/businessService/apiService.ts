/* eslint-disable no-console */
import axios from 'axios';
import { ITodoData } from '@/type/ITodoData';

const SERVER_URL = 'http://localhost:3001/todos';

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
