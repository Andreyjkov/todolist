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
  const { todos, status } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, []);

  const handleDeleteTodo = async (item: ITodoData) => {
    dispatch(deleteTodoThunk(item.id));
  };

  const handleLinkTo = (id: number) => {
    navigate(`${PATH_LINK_TO}${id}`);
  };

  return (
    <List
      handleBtn={handleDeleteTodo}
      items={todos}
      handleLinkTo={handleLinkTo}
      isLoadingButton={status === API_STATUS.PENDING}
      loading={!todos?.length && status === API_STATUS.PENDING}
    />
  );
});
