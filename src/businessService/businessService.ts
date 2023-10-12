import { TODO_ACTION_TYPE } from '@constants/actionTypes';
import { TODO_EVENT_NAME } from '@constants/eventTypes';
import { ITodoData } from '@type/ITodoData';
import {
  AddTodoPayload,
  DeleteTodoPayload,
  EditTodoPayload,
} from '../type/AddTodoPayload';

type Action =
  | {
      type: TODO_ACTION_TYPE.ADD_TODO;
      payload: AddTodoPayload;
    }
  | {
      type: TODO_ACTION_TYPE.DELETE_TODO;
      payload: DeleteTodoPayload;
    }
  | {
      type: TODO_ACTION_TYPE.EDIT_TODO;
      payload: EditTodoPayload;
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
            value: action.payload.value,
            date: action.payload.date,
            updateDate: date,
            status: false,
            price: action.payload.price,
          },
        ];
        publishEvent(TODO_EVENT_NAME.UPDATE_TODOS);
      }

      break;
    case TODO_ACTION_TYPE.DELETE_TODO:
      todos = todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });

      publishEvent(TODO_EVENT_NAME.UPDATE_TODOS);

      break;
    case TODO_ACTION_TYPE.EDIT_TODO:
      {
        const updateDate = new Date();
        todos = todos.map((item) => {
          if (item.id === action.payload.id) {
            return {
              id: item.id,
              value: action.payload.value,
              date: action.payload.date,
              updateDate: updateDate,
              status: action.payload.status,
              price: action.payload.price,
            };
          } else {
            return item;
          }
        });
        publishEvent(TODO_EVENT_NAME.UPDATE_TODOS);
      }

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
