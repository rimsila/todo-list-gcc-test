import TodoProvider from "./todo-list/todoCtx";
import TodosList from "./todo-list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <TodoProvider>
      <ToastContainer />
      <TodosList />
    </TodoProvider>
  );
}

export default App;
