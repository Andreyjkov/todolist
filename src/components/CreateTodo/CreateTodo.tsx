import React, { memo } from 'react';
import { businessService } from '../../businessService/businessService';
import { MyForm } from '../Form/MyForm';
import { ACTION_TYPE_ADD, EVENT_NAME } from '../../constants';

export const CreateTodo = memo(() => {
  const store = businessService.todoStore();

  const handleNewTodo = (value: string) => {
    store.dispatch({ type: ACTION_TYPE_ADD, value });

    businessService.publishEvent(EVENT_NAME);
  };

  return <MyForm submit={handleNewTodo} />;
});
