import * as React from "react";
import { ITodo, TodoCtx } from "./todoCtx";

type TodoProps = {
  todo: ITodo;
};

const Todo = ({ todo }: TodoProps) => {
  const { setEditTodo, removeTodo } = React.useContext(TodoCtx);

  return (
    <div
      className="list todo-outer"
    >
      <div className={`list--text ${todo.isDone ? "complete" : ""}`}>
        <ul style={{ margin: 0 }}>
          <li>
            <h2>{todo.title}</h2>
          </li>
        </ul>
      </div>
      <div className="btn todo-btn-overlap ">
        <button onClick={() => setEditTodo(todo)} className="list--btn">
          Edit
        </button>
        <button
          className="list--btn-remove"
          onClick={() => {
            removeTodo(todo?.id);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
