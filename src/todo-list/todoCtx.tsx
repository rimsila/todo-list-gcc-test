import * as React from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export type ITodo = {
  id?: number | string;
  title: string;
  isDone?: boolean;
};

export type ContextTodoType = {
  updateTodo: (id: number | string, data: ITodo) => void;
  todos: ITodo[];
  todosTemp: ITodo[];
  removeAll: () => void;
  setDefault: () => void;
  removeTodo: (id: number | string) => void;
  editTodo: ITodo;
  setEditTodo?: React.Dispatch<React.SetStateAction<Partial<ITodo>>>;
  setTodosTemp?: React.Dispatch<React.SetStateAction<Partial<ITodo[]>>>;
  setTodos?: React.Dispatch<React.SetStateAction<Partial<ITodo[]>>>;
  setIsExistList?: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: (todo: Partial<ITodo>) => void;
  isExistList: boolean;
};

export const TodoCtx = React.createContext<ContextTodoType | null>(null);

const todoInit = [
  {
    id: uuid(),
    title: "todo 1",
    isDone: false,
  },
  {
    id: uuid(),
    title: "todo 2",
    isDone: false,
  },
  {
    id: uuid(),
    title: "todo 3",
    isDone: false,
  },
];

const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
  const [editTodo, setEditTodo] = React.useState<ITodo>();
  const [isExistList, setIsExistList] = React.useState<boolean>(false);
  const [todos, setTodos] = React.useState<ITodo[]>(todoInit);
  const [todosTemp, setTodosTemp] = React.useState<ITodo[]>(todoInit);

  /**
   *  ----- func removeTodo in the list ------
   */
  const removeAll = React.useCallback(() => {
    setTodos([]);
    setTodosTemp([]);
    setIsExistList(false);
    setEditTodo({ title: "" });
    toast("Removed all todo successfully!", {
      position: "top-center",
      type: "success",
      autoClose: 2500,
      hideProgressBar: true,
    });
  }, []);

  /**
   *  ----- func addTodo to the list ------
   */
  const addTodo = React.useCallback(
    (todoItem: ITodo) => {
      if (todoItem?.title) {
        const newTodo: ITodo = {
          id: uuid(),
          title: todoItem?.title?.trim(),
        };
        setTimeout(() => {
          setTodos([...new Set([...todosTemp, newTodo])]);
          setTodosTemp([...new Set([...todosTemp, newTodo])]);
          toast("Added todo successfully!", {
            position: "top-center",
            type: "success",
            autoClose: 2500,
            hideProgressBar: true,
          });
        }, 200);
      }
    },
    [todosTemp]
  );

  /**
   *  ----- func updateTodo from the list ------
   */
  const updateTodo = React.useCallback(
    (id: number, data: ITodo) => {
      const newTodo = [...todosTemp];
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
    },
    [todosTemp]
  );

  /**
   *  ----- func removeTodo in the list ------
   */
  const removeTodo = React.useCallback(
    (id: number) => {

      const newTodos = [...todos];
      const filterTodo = newTodos.filter((item) => item.id !== id);
      const filterTempTodo = todosTemp.filter((item) => item.id !== id);

      setTodos(filterTodo);
      setTodosTemp(filterTempTodo);

      toast("Removed todo successfully!", {
        position: "top-center",
        type: "success",
        autoClose: 2500,
        hideProgressBar: true,
      });
    },
    [todos, todosTemp]
  );

  /**
   *  ----- func removeTodo in the list ------
   */
  const setDefault = React.useCallback(() => {
    setTodos(todoInit);
    toast("Set Default todo successfully!", {
      position: "top-center",
      type: "success",
      autoClose: 2500,
      hideProgressBar: true,
    });
  }, []);

  

  return (
    <TodoCtx.Provider
      value={{
        setTodosTemp,
        setTodos,
        setDefault,
        todosTemp,
        removeAll,
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

export default TodoListProvider;
