import React from 'react';
import { createRoot } from 'react-dom/client';


import TodosBox from "./components/TodosBox";

import "./css/todos.css";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <TodosBox />
);