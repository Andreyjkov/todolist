import { ITodoData } from "../type";

type Actoin = {
  type: string;
  value?: string;
  id?: number;
};

let todos: ITodoData[] = [];

function createStore() {
  return {
    dispatch: (action: Actoin) => {
      todos = todosReducer(action);
    },
    getState: () => todos,
  };
}

function todosReducer(action: Actoin) {
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
}

const getTodoById = (id: string) => {
  return todos.find((todo) => todo.id === +id);
};

export const businessService = {
  getTodoById,
  createStore,
};
