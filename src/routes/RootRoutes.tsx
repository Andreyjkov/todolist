import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound/NotFound";
import { TodoDetails } from "../pages/TodoDetails/TodoDetails";
import { Home } from "../pages";

const ROUTS = {
  HOME: "/",
  TODO_DETAILS: "todo/:id",
  NOT_FOUND: "*",
};

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTS.HOME} element={<Home />} />
      <Route path={ROUTS.TODO_DETAILS} element={<TodoDetails />} />
      <Route path={ROUTS.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
