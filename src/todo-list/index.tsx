import * as React from "react";

import { ContextType, ITodo, TodoCtx } from "./todoCtx";
import Todo from "../todo-list/Todo";
import "./todo-styles.css";
import AddTodoForm from "./AddTodoForm";

const TodosList = () => {
  const { todos, removeTodo } = React.useContext(
    TodoCtx
  ) as ContextType;

  return (
    <div className="todos-container">
      <h3 className="todo-title">TODO LIST </h3>
      <div className="todo-body">
        {/* -------- add todo ---------*/}
        <AddTodoForm />

        {/* -------- todo list ---------*/}
        {todos.map((todo: ITodo) => (
          <Todo
            key={todo.id}
            {...{
              todo,
              removeTodo,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TodosList;
