import axios from 'axios';
import { ITodoData } from '@/type/ITodoData';
import { handleServerError } from '@/utils/handleServerError';

const SERVER_URL = 'http://localhost:3001/todos';

const apiClient = axios.create({
  baseURL: SERVER_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => handleServerError(error)
);

const fetchTodos = async (): Promise<ITodoData[]> => {
  return (await apiClient.get('/')).data;
};

const addTodo = async (newTodo: ITodoData): Promise<ITodoData> => {
  return (await apiClient.post('/', newTodo)).data;
};

const editTodo = async (
  id: number,
  updatedTodo: ITodoData
): Promise<string> => {
  return (await apiClient.put(`/${id}`, updatedTodo)).statusText;
};

const deleteTodo = async (id: number): Promise<string> => {
  return (await apiClient.delete(`/${id}`)).statusText;
};

const getTodoById = async (id: number): Promise<ITodoData> => {
  return (await apiClient.get(`/${id}`)).data;
};

const get403 = async (): Promise<ITodoData[]> => {
  return (await apiClient.get('/forbidden')).data;
};

export const apiService = {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  getTodoById,

  get403,
};
