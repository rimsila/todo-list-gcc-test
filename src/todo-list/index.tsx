import * as React from "react";

import { ITodo, TodoCtx } from "./todoCtx";
import Todo from "../todo-list/Todo";
import "./todo-styles.css";
import AddTodoForm from "./AddTodoForm";

const TodosList = () => {
  const { todos, removeAll, setDefault} =
    React.useContext(TodoCtx);



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
            }}
          />
        ))}

        {/* -------- footer ---------*/}
        {todos.length > 0 ? (
          <div className="footer">
            <button onClick={removeAll} className="clear-btn">
              Remove All
            </button>
          </div>
        ) : (
          <div className="footer">
            <button onClick={setDefault} className="clear-btn">
              Set default todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosList;
