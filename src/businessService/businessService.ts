import { ITodoData } from "../type";

type Actoin = {
  type: "ADD_TODO" | "DELETE_TODO";
  value?: string;
  id?: number;
};

let todos: ITodoData[] = [];

const todoStore = () => {
  return {
    dispatch: (action: Actoin) => {
      todos = todosReducer(action);
    },
    getState: () => todos,
  };
};

const todosReducer = (action: Actoin) => {
  switch (action.type) {
    case "ADD_TODO":
      const date = new Date();
      return [
        ...todos,
        {
          id: date.getTime(),
          value: action.value,
          date: date,
        },
      ];
    case "DELETE_TODO":
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

const subscribeEvent = (eventName: string, listener: any) => {
  document.addEventListener(eventName, listener);
  console.log("subscribe");
};

const unsubscribeEvent = (eventName: string, listener: any) => {
  document.removeEventListener(eventName, listener);
  console.log("unsubscribe");
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
