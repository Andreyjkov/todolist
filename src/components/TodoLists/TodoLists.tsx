import React, { memo, useEffect, useState } from "react";
import { List } from "../List/List";
import { businessService } from "../../businessService/businessService";

export const TodoLists = memo(() => {
  const store = businessService.todoStore();
  const [todos, setTodos] = useState(store.getState());

  const listener = () => {
    setTodos(store.getState());
  };

  useEffect(() => {
    businessService.subscribeEvent("newTodo", listener);
    return () => {
      return businessService.unsubscribeEvent("newTodo", listener);
    };
  }, []);

  const handleDeleteTodo = (id: number) => {
    store.dispatch({ type: "DELETE_TODO", id });

    const data = store.getState();
    setTodos(data);
  };
  console.log("render TodoLists");

  return <List handleBtn={handleDeleteTodo} items={todos} />;
});
