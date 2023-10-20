/* eslint-disable no-console */
import { ITodoData } from '@/type/ITodoData';

const SERVER_URL = 'http://localhost:3001/todos';

enum RES_TODO_ERROR {
  FETCH = 'Error when fetching todos',
  ADD = 'Error when adding a todo',
  EDIT = 'Error when editing a todo',
  DELETE = 'Error when deleting a todo',
  GET_BY_ID = 'Error when fetching todo by ID',
}

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response;
};

const fetchTodos = async (): Promise<ITodoData[]> => {
  try {
    const response = await fetch(SERVER_URL);
    return await handleResponse(response).json();
  } catch (error) {
    console.error(RES_TODO_ERROR.FETCH, error);
  }
};

const addTodo = async (newTodo: ITodoData): Promise<ITodoData> => {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    return await handleResponse(response).json();
  } catch (error) {
    console.error(RES_TODO_ERROR.ADD, error);
  }
};

const editTodo = async (
  id: number,
  updatedTodo: ITodoData
): Promise<number> => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });
    return handleResponse(response).status;
  } catch (error) {
    console.error(RES_TODO_ERROR.EDIT, error);
  }
};

const deleteTodo = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response).status;
  } catch (error) {
    console.error(RES_TODO_ERROR.DELETE, error);
  }
};

const getTodoById = async (id: number): Promise<ITodoData> => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}`);
    return await handleResponse(response).json();
  } catch (error) {
    console.error(RES_TODO_ERROR.GET_BY_ID, error);
  }
};

export const apiService = {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  getTodoById,
};
