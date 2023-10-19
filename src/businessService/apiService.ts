import { ITodoData } from '@/type/ITodoData';

const SERVER_URL = 'http://localhost:3001/todos';

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
    // eslint-disable-next-line no-console
    console.error('Error when fetching todos', error);
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
    // eslint-disable-next-line no-console
    console.error('Error when adding a task', error);
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
    // eslint-disable-next-line no-console
    console.error('Error when editing a task', error);
  }
};

const deleteTodo = async (id: number): Promise<number> => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response).status;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error when deleting a task', error);
  }
};

const getTodoById = async (id: number): Promise<ITodoData> => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}`);
    return await handleResponse(response).json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error when fetching task by ID', error);
  }
};

export const apiService = {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  getTodoById,
};
