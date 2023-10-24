const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

let todos = [
  {
    id: 1,
    value: 'Task one',
    date: 'Mon Oct 01 2023 09:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 01 2023 09:30:26 GMT+0300 (Москва, стандартное время)',
    price: 10,
    status: false,
  },
  {
    id: 2,
    value: 'Task two',
    date: 'Mon Oct 05 2023 12:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 05 2023 12:30:26 GMT+0300 (Москва, стандартное время)',
    price: 50,
    status: false,
  },
  {
    id: 3,
    value: 'Task three',
    date: 'Mon Oct 10 2023 15:30:26 GMT+0300 (Москва, стандартное время)',
    updateDate: 'Mon Oct 10 2023 15:30:26 GMT+0300 (Москва, стандартное время)',
    price: 100,
    status: false,
  },
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const updatedTodo = req.body;

  todos = todos.map((todo) => {
    if (todo.id === id) {
      return updatedTodo;
    } else {
      return todo;
    }
  });
  res.status(200).end();
});

app.delete('/todos/:id', (req, res) => {
  const id = +req.params.id;
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).end();
  // res.status(403).end();
});

app.get('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const findTodo = todos.find((todo) => todo.id === id);
  res.json(findTodo);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});
