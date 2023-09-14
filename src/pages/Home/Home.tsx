import React, { useState } from "react";
import { TodoInput, TodoLists } from "../../components";
import styles from "./styles.module.css";

export const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>(["test"]);

  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  const deleteTodo = (text: string) => {
    const newTodos = todos.filter((todo) => {
      return todo !== text;
    });
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1 className={styles.myTest}>Todo App</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
        <TodoLists lists={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

// const [objTodos, setObjTodos] = useState<{ id: number; value: string }[]>([]);

// const addTodo1 = () => {
//   const objTodo = {
//     id: new Date().getTime(),
//     value: todo,
//   };
//   setObjTodos([...objTodos, objTodo]);
//   setTodo("");
// };

//  "devDependencies": {
//   "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
// }
