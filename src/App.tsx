import React from "react";
import { Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { TodoDetails } from "./pages/TodoDetails/TodoDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="todo/:id" element={<TodoDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
