import React, { memo } from 'react';

import { businessService } from '@/businessService/businessService';
import { MyForm } from '@/components/Form/MyForm';
import { TODO_ACTION_TYPE } from '@/constants';

export const TodoCreate = memo(() => {
  const store = businessService.todoStore();

  const handleNewTodo = (value: string) => {
    store.dispatch({
      type: TODO_ACTION_TYPE.ADD_TODO,
      payload: { value: value },
    });
  };

  return <MyForm submit={handleNewTodo} />;
});
