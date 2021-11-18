import React from 'react';
import ReactDOM from 'react-dom';
import TodosBox from "./components/TodosBox";

import "./css/todos.css";

ReactDOM.render(
  <React.StrictMode>
    <TodosBox />
  </React.StrictMode>,
  document.getElementById('root')
);