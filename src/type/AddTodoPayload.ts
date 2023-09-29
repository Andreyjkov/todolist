export type AddTodoPayload = {
  value: string;
};

export type DeleteTodoPayload = {
  id: number;
};

export type EditTodoPayload = {
  id: number;
  value: string;
  date: Date;
  updateDate: Date;
};
