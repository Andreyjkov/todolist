import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '@/components/List/List';
import { businessService } from '@/businessService/businessService';

import { ITodoData } from '@type/ITodoData';
import { PATH_LINK_TO } from '@/constants/routsPath';
import { apiService } from '@/businessService/apiService';
import { TODO_EVENT_NAME } from '@/constants/eventTypes';

export const TodoLists = memo(() => {
  const [todos, setTodos] = useState<ITodoData[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchTodos()
      .then((data) => setTodos(data))
      .catch((e) => alert(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    businessService.subscribeEvent(TODO_EVENT_NAME.UPDATE_TODOS, fetchData);
    return () => {
      businessService.unsubscribeEvent(TODO_EVENT_NAME.UPDATE_TODOS, fetchData);
    };
  }, []);

  const handleDeleteTodo = async (item: ITodoData) => {
    setIsLoadingButton(true);
    apiService
      .deleteTodo(item.id)
      .then(() =>
        document.dispatchEvent(new CustomEvent(TODO_EVENT_NAME.UPDATE_TODOS))
      )
      .catch((e) => alert(e))
      .finally(() => setIsLoadingButton(false));
  };

  const handleLinkTo = (id: number) => {
    navigate(`${PATH_LINK_TO}${id}`);
  };

  return (
    <List
      handleBtn={handleDeleteTodo}
      items={todos}
      handleLinkTo={handleLinkTo}
      loading={loading}
      isLoadingButton={isLoadingButton}
    />
  );
});
