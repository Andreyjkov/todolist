export type AddTodoPayload = {
  value: string;
  date: Date;
  price: number;
};

export type DeleteTodoPayload = {
  id: number;
};

export type EditTodoPayload = {
  id: number;
  value: string;
  date: Date;
  price: number;
  status: boolean;
};
