export type AddTodoPayload = {
  value: string;
  date: string;
  price: number;
};

export type DeleteTodoPayload = {
  id: number;
};

export type EditTodoPayload = {
  id: number;
  value: string;
  date: string;
  price: number;
  status: boolean;
};
