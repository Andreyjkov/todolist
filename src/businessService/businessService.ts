import { ACTION_TYPE_ADD, ACTION_TYPE_DELETE } from '../constants';
import { ITodoData } from '../type';

type Action = {
  type: string;
  value?: string;
  id?: number;
};

let todos: ITodoData[] = [];

const todoStore = () => {
  return {
    dispatch: (action: Action) => {
      todos = todosReducer(action);
    },
    getState: () => todos,
  };
};

const todosReducer = (action: Action) => {
  const date = new Date();

  switch (action.type) {
    case ACTION_TYPE_ADD:
      return [
        ...todos,
        {
          id: date.getTime(),
          value: action.value,
          date: date,
        },
      ];
    case ACTION_TYPE_DELETE:
      return todos.filter((todo) => {
        return todo.id !== action.id;
      });
    default:
      return todos;
  }
};

const getTodoById = (todos: ITodoData[], id: number) => {
  return todos.find((todo) => todo.id === +id);
};

const subscribeEvent = (eventName: string, listener: () => void) => {
  document.addEventListener(eventName, listener);
};

const unsubscribeEvent = (eventName: string, listener: () => void) => {
  document.removeEventListener(eventName, listener);
};

const publishEvent = (eventName: string) => {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
};

export const businessService = {
  getTodoById,
  todoStore,
  subscribeEvent,
  unsubscribeEvent,
  publishEvent,
};
