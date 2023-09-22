import { ITodoData } from "../type";

let todos: ITodoData[] = [];

const addTodo = (value: string) => {
  const date = new Date();
  const objDataTodo = {
    id: date.getTime(),
    value: value,
    date: date,
  };
  todos = [...todos, objDataTodo];
};

const deleteTodo = (id: number) => {
  const newTodos = todos.filter((todo) => {
    return todo.id !== id;
  });
  todos = newTodos;
};

const getTodoById = (id: string) => {
  return todos.find((todo) => todo.id === +id);
};

const getTodos = () => {
  return todos;
};

export const businessService = {
  addTodo,
  deleteTodo,
  getTodos,
  getTodoById,
};
