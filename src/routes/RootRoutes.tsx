import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound/NotFound";
import { TodoDetails } from "../pages/TodoDetails/TodoDetails";
import { Home } from "../pages";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="todo/:id" element={<TodoDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
