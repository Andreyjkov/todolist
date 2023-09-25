import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '../List/List';
import { businessService } from '../../businessService/businessService';
import { ACTION_TYPE_DELETE, EVENT_NAME } from '../../constants';

export const TodoLists = memo(() => {
  const store = businessService.todoStore();
  const [todos, setTodos] = useState(store.getState());
  const navigate = useNavigate();

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

  const handleLinkTo = (id: number) => {
    navigate(`/todo/${id}`);
  };

  return (
    <List
      handleBtn={handleDeleteTodo}
      items={todos}
      handleLinkTo={handleLinkTo}
    />
  );
});
