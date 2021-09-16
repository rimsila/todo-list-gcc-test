import * as React from "react";
import { TodoCtx } from "./todoCtx";

const AddTodoForm = () => {
  const {
    addTodo,
    todos,
    editTodo,
    setEditTodo,
    setIsExistList,
    isExistList,
    updateTodo,
  } = React.useContext(TodoCtx);

  /**
   * ----- handleChangeForm ------
   */
  const handleChangeForm = (value: string) => {
    const existTitle = todos.find((v) => v.title === value.trim());
    setEditTodo((prev) => ({ ...prev, title: value }));

    if (existTitle) {
      setIsExistList(Boolean(existTitle));
      return;
    }
    setIsExistList(false);
  };

  /**
   * ------ onSaveTodo ------
   */
  const onSaveTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const existItem = todos.find((v) => v.title === editTodo?.title?.trim());
    if (existItem) {
      setIsExistList(true);
      return;
    }

    /**
     * add & update
     */
    editTodo?.id
      ? updateTodo(editTodo.id, {
          ...editTodo,
          title: editTodo?.title?.trim(),
        })
      : addTodo(editTodo);
    //clean up
    setIsExistList(false);
    setEditTodo({ id: undefined, title: "" });
  };

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={(e) => onSaveTodo(e)}>
        <label htmlFor="name">Todo:</label>
        <input
          value={editTodo?.title}
          pattern="^(?!\s*$).+" // prevent whitespace
          placeholder="What needs to be done?"
          required
          onChange={(e) => handleChangeForm(e.target.value)}
          id="name"
        />
      </form>
      {isExistList && (
        <p style={{ color: "red", marginBottom: 15 }}>
          This item is already exist try another one!
        </p>
      )}
    </div>
  );
};

export default AddTodoForm;
