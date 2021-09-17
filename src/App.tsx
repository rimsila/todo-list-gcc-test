import TodoListProvider from "./todo-list/todoCtx";
import TodosList from "./todo-list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoot =()=> {
  return (
    <TodoListProvider>
      <ToastContainer />
      <TodosList />
    </TodoListProvider>
  );
}

export default AppRoot;
