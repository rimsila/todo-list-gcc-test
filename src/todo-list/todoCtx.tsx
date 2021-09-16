import * as React from "react";
import { toast } from "react-toastify";

export interface ITodo {
  id: number;
  title: string;
  isDone?: boolean;
}

export type ContextType = {
  updateTodo: (id: number, data: ITodo) => void;
  todos: ITodo[];
  removeTodo: (id: number) => void;
  editTodo: ITodo;
  setEditTodo?: React.Dispatch<React.SetStateAction<Partial<ITodo>>>;
  setIsExistList?: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: (todo: Partial<ITodo>) => void;
  isExistList: boolean;
};

export const TodoCtx = React.createContext<ContextType | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [editTodo, setEditTodo] = React.useState<ITodo>();
  const [isExistList, setIsExistList] = React.useState<boolean>(false);

  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      id: 1,
      title: "todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "todo 3",
      isDone: false,
    },
  ]);

  /**
   *  ----- func addTodo to the list ------
   */
  const addTodo = React.useCallback(
    (todoItem: ITodo) => {
      if (todoItem?.title) {
        const newTodo: ITodo = {
          id: new Date().getTime(),
          title: todoItem?.title?.trim(),
        };
        setTodos([...todos, newTodo]);
        toast("Added todo successfully!", {
          position: "top-center",
          type: "success",
          autoClose: 2500,
          hideProgressBar: true,
        });
      }
    },
    [todos]
  );

  /**
   *  ----- func updateTodo from the list ------
   */
  const updateTodo = React.useCallback((id: number, data: ITodo) => {
    const newTodo = [...todos];
    // eslint-disable-next-line array-callback-return
    newTodo.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.title = data?.title?.trim();
        setTodos([...newTodo]);
      }
    });
    toast("Updated todo successfully!", {
      position: "top-center",
      type: "success",
      autoClose: 2500,
      hideProgressBar: true,
    });
  }, [todos]);

  /**
   *  ----- func removeTodo in the list ------
   */
  const removeTodo = (id: number) => {
    const newTodos = [...todos];
    const findInd = todos.findIndex((item) => item.id === id);
    newTodos.splice(findInd, 1);

    setTodos(newTodos);
    toast("Removed todo successfully!", {
      position: "top-center",
      type: "success",
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  return (
    <TodoCtx.Provider
      value={{
        setEditTodo,
        isExistList,
        todos,
        addTodo,
        updateTodo,
        removeTodo,
        setIsExistList,
        editTodo,
      }}
    >
      {children}
    </TodoCtx.Provider>
  );
};

export default TodoProvider;
