import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '@/components/List/List';
import { businessService } from '@/businessService/businessService';
import { TODO_EVENT_NAME } from '@/constants/eventTypes';
import { ITodoData } from '@type/ITodoData';
import { TODO_ACTION_TYPE } from '@/constants/actionTypes';
import { PATH_LINK_TO } from '@/constants/routsPath';

export const TodoLists = memo(() => {
  const store = businessService.todoStore();
  const [todos, setTodos] = useState<ITodoData[] | undefined>();
  const navigate = useNavigate();

  const updateState = () => {
    setTodos(store.getState());
  };

  useEffect(() => {
    updateState();
    businessService.subscribeEvent(TODO_EVENT_NAME.UPDATE_TODOS, updateState);
    return () => {
      businessService.unsubscribeEvent(
        TODO_EVENT_NAME.UPDATE_TODOS,
        updateState
      );
    };
  }, []);

  const handleDeleteTodo = (item: ITodoData) => {
    store.dispatch({
      type: TODO_ACTION_TYPE.DELETE_TODO,
      payload: { id: item.id },
    });
  };

  const handleLinkTo = (id: number) => {
    navigate(`${PATH_LINK_TO}${id}`);
  };

  return (
    <List
      handleBtn={handleDeleteTodo}
      items={todos}
      handleLinkTo={handleLinkTo}
    />
  );
});
