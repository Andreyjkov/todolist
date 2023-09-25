import React, { memo } from "react";
import { businessService } from "../../businessService/businessService";
import { MyForm } from "../Form/MyForm";

export const CreateTodo = memo(() => {
  const store = businessService.todoStore();

  const handleNewTodo = (value: string) => {
    store.dispatch({ type: "ADD_TODO", value });

    businessService.publishEvent("newTodo");
  };

  console.log("@render CreateTodo");
  return <MyForm submit={handleNewTodo} />;
});
