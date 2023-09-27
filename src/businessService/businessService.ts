import { TODO_ACTION_TYPE, TODO_EVENT_NAME } from '../constants';
import { ITodoData } from '../type';

type Action = {
  type: TODO_ACTION_TYPE;
  value?: string;
  id?: number;
};

let todos: ITodoData[] = [];

const todoStore = () => {
  return {
    dispatch: (action: Action) => {
      todosReducer(action);
    },
    getState: () => todos,
  };
};

const todosReducer = (action: Action) => {
  switch (action.type) {
    case TODO_ACTION_TYPE.ADD_TODO:
      {
        const date = new Date();

        todos = [
          ...todos,
          {
            id: date.getTime(),
            value: action.value,
            date: date,
          },
        ];
        publishEvent(TODO_EVENT_NAME.UPDATE_TODO);
      }

      break;
    case TODO_ACTION_TYPE.DELETE_TODO:
      todos = todos.filter((todo) => {
        return todo.id !== action.id;
      });

      publishEvent(TODO_EVENT_NAME.UPDATE_TODO);

      break;
  }
};

const getTodoById = (id: number): ITodoData | undefined => {
  return todos.find((todo) => todo.id === id);
};

const subscribeEvent = (eventName: TODO_EVENT_NAME, listener: () => void) => {
  document.addEventListener(eventName, listener);
};

const unsubscribeEvent = (eventName: TODO_EVENT_NAME, listener: () => void) => {
  document.removeEventListener(eventName, listener);
};

const publishEvent = (eventName: TODO_EVENT_NAME) => {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
};

export const businessService = {
  getTodoById,
  todoStore,
  subscribeEvent,
  unsubscribeEvent,
};
