import * as React from "react";
import { ITodo, TodoCtx } from "./todoCtx";

type TodoProps = {
  todo: ITodo;
  removeTodo: (id: number) => void;
};

const Todo = ({ todo, removeTodo }: TodoProps) => {
  const { setEditTodo } = React.useContext(TodoCtx);

  return (
    <div className="list todo-outer">
      <div className="list--text">
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
            setEditTodo({ title: "", id: undefined });
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
