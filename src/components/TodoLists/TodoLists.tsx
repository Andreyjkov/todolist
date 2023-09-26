import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '../List/List';
import { businessService } from '../../businessService/businessService';
import { TODO_EVENT_NAME, TODO_ACTION_TYPE } from '../../constants';
import { ITodoData } from '../../type';

export const TodoLists = memo(() => {
  const store = businessService.todoStore();
  const [todos, setTodos] = useState<ITodoData[] | undefined>();
  const navigate = useNavigate();

  const updateState = () => {
    setTodos(store.getState());
  };

  useEffect(() => {
    updateState();
    businessService.subscribeEvent(TODO_EVENT_NAME.UPDATE_TODO, updateState);
    return () => {
      businessService.unsubscribeEvent(
        TODO_EVENT_NAME.UPDATE_TODO,
        updateState
      );
    };
  }, []);

  const handleDeleteTodo = (item: ITodoData) => {
    store.dispatch({ type: TODO_ACTION_TYPE.DELETE_TODO, id: item.id });
  };

  const handleLinkTo = (id: number) => {
    navigate(`todoDetals/${id}`);
  };

  return (
    <List
      handleBtn={handleDeleteTodo}
      items={todos}
      handleLinkTo={handleLinkTo}
    />
  );
});
