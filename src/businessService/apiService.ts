import { ITodoData } from '@/type/ITodoData';

let todos: ITodoData[] = [
  {
    id: 1,
    value: 'Test JSON',
    date: 'Mon Oct 01 2023 09:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 01 2023 09:30:26 GMT+0300 (Москва, стандартное время)',
    price: 10,
    status: false,
  },
  {
    id: 2,
    value: 'Test2 JSON',
    date: 'Mon Oct 05 2023 12:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 05 2023 12:30:26 GMT+0300 (Москва, стандартное время)',
    price: 50,
    status: false,
  },
  {
    id: 3,
    value: 'Test3 JSON',
    date: 'Mon Oct 10 2023 15:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 10 2023 15:30:26 GMT+0300 (Москва, стандартное время)',
    price: 100,
    status: false,
  },
  {
    id: 4,
    value: 'Test4 JSON',
    date: 'Mon Oct 15 2023 18:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 15 2023 18:30:26 GMT+0300 (Москва, стандартное время)',
    price: 150,
    status: false,
  },
  {
    id: 5,
    value: 'Test5 JSON',
    date: 'Mon Oct 20 2023 21:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 20 2023 21:30:26 GMT+0300 (Москва, стандартное время)',
    price: 200,
    status: false,
  },
];

const fetchMockData = async (): Promise<ITodoData[]> => {
  return new Promise((resolve /* reject */) => {
    setTimeout(() => {
      resolve(todos);
      // reject('fetch mock data reject');
    }, 0);
  });
};

const addMockData = async (newData: ITodoData): Promise<void> => {
  await simulateDelay(1000);
  const date = new Date();
  todos = [
    ...todos,
    {
      ...newData,
      id: date.getTime(),
      updateDate: date.toString(),
      status: false,
    },
  ];
};

const editMockData = async (updatedData: ITodoData): Promise<void> => {
  await simulateDelay(1000);
  const updateDate = new Date().toString();
  todos = todos.map((item) => {
    if (item.id === updatedData.id) {
      return {
        ...updatedData,
        id: item.id,
        updateDate: updateDate,
      };
    } else {
      return item;
    }
  });
};

const deleteMockData = async (id: number): Promise<void> => {
  await simulateDelay(1000);
  todos = todos.filter((todo) => todo.id !== id);
};

const getMockDataById = async (id: number): Promise<ITodoData | undefined> => {
  await simulateDelay(1000);
  return todos.find((todo) => todo.id === id);
};

const simulateDelay = (ms: number): Promise<void> => {
  return new Promise((resolve /* reject */) => {
    setTimeout(() => {
      resolve();
      // reject('error reject');
    }, ms);
  });
};

export const apiService = {
  fetchMockData,
  addMockData,
  editMockData,
  deleteMockData,
  getMockDataById,
};
