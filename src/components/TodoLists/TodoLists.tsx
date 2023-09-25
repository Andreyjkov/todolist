import React, { memo, useEffect, useState } from 'react';
import { List } from '../List/List';
import { businessService } from '../../businessService/businessService';
import { ACTION_TYPE_DELETE } from '../../constants/actionTypes';
import { EVENT_NAME } from '../../constants/eventName';

export const TodoLists = memo(() => {
  const store = businessService.todoStore();
  const [todos, setTodos] = useState(store.getState());

  const listener = () => {
    setTodos(store.getState());
  };

  useEffect(() => {
    businessService.subscribeEvent(EVENT_NAME, listener);
    return () => {
      return businessService.unsubscribeEvent(EVENT_NAME, listener);
    };
  }, []);

  const handleDeleteTodo = (id: number) => {
    store.dispatch({ type: ACTION_TYPE_DELETE, id });

    const data = store.getState();
    setTodos(data);
  };

  return <List handleBtn={handleDeleteTodo} items={todos} />;
});
