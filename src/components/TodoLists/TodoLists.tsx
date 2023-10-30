import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '@components/List/List';
import { ITodoData } from '@type/ITodoData';
import { PATH_LINK_TO } from '@constants/routsPath';
import { API_STATUS } from '@constants/apiStatus';
import { useAppDispatch, useAppSelector } from '@store/hooksStore';
import { deleteTodoThunk, fetchTodosThunk } from '@store/todos/asyncThunk';

export const TodoLists = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { todos, ApiStatus } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, []);

  const handleDeleteTodo = async (item: ITodoData) => {
    if (ApiStatus !== API_STATUS.PENDING) {
      dispatch(deleteTodoThunk(item.id));
    }
  };

  const handleLinkTo = (id: number) => {
    if (ApiStatus !== API_STATUS.PENDING) {
      navigate(`${PATH_LINK_TO}${id}`);
    }
  };

  return (
    <List
      handleBtn={handleDeleteTodo}
      items={todos}
      handleLinkTo={handleLinkTo}
      loading={ApiStatus === API_STATUS.PENDING}
    />
  );
});
