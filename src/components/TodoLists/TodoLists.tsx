import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '@/components/List/List';
import { eventService } from '@/businessService/eventService';
import { ITodoData } from '@type/ITodoData';
import { PATH_LINK_TO } from '@/constants/routsPath';
import { apiService } from '@/businessService/apiService';
import { EVENT_NAME } from '@/constants/eventName';
import { toastService } from '@/businessService/toastService';
import { TOAST_MODE } from '@/constants/toastMode';

export const TodoLists = memo(() => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodoData[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchTodos()
      .then((data) => setTodos(data))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    eventService.subscribeEvent(EVENT_NAME.UPDATE_TODOS, fetchData);
    return () => {
      eventService.unsubscribeEvent(EVENT_NAME.UPDATE_TODOS, fetchData);
    };
  }, []);

  const handleDeleteTodo = async (item: ITodoData) => {
    setIsLoadingButton(true);
    apiService
      .deleteTodo(item.id)
      .then(() => {
        toastService.addToast('task deleted', TOAST_MODE.WARNING, 2000);
        eventService.publishEvent(EVENT_NAME.UPDATE_TODOS);
      })
      .catch(() => {})
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
