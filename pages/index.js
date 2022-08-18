import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";
export default function Home() {
  const [todoText, setTodotext] = useState([]);

  const deleteTodo = (idx) => {
    todoText.splice(idx, 1);
    const newTodos = [...todoText];
    setTodotext(newTodos);
  };

  const markTodo = (idx) => {
    todoText[idx].completed = !todoText[idx].completed;
    setTodotext([...todoText]);
  };

  const moveUp = (idx) => {
    if (idx === 0) {
      return;
    } else {
      const temp = todoText[idx];
      todoText[idx] = todoText[idx - 1];
      todoText[idx - 1] = temp;
      setTodotext([...todoText]);
    }
  };

  const moveDown = (idx) => {
    if (idx === todoText.length - 1) {
      return;
    } else {
      const temp = todoText[idx];
      todoText[idx] = todoText[idx + 1];
      todoText[idx + 1] = temp;
      setTodotext([...todoText]);
    }
  };

  const addTodo = (title, completed) => {
    setTodotext([{ title: title, completed: completed }, ...todoText]);
  };

  const onKeyUpHandler = (event) => {
    if (event.key !== "Enter") return;
    if (event.target.value === "") {
      alert("Todo can not be empty");
      return;
    }
    addTodo(event.target.value, false);
    event.target.value = "";
  };

  useEffect(() => {
    const todosStr = localStorage.getItem("react-todos");
    if (!todosStr) setTodotext([]);
    else setTodotext(JSON.parse(todosStr));
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    saveTodos();
  }, [todoText]);

  const saveTodos = () => {
    const todosStr = JSON.stringify(todoText);
    localStorage.setItem("react-todos", todosStr);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={onKeyUpHandler}
        />
        {todoText.map((Element, i) => (
          <Todo
            title={Element.title}
            completed={Element.completed}
            key={i}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
            onDelete={() => deleteTodo(i)}
            onMark={() => markTodo(i)}
          />
        ))}
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todoText.length}) </span>
          <span className="text-warning">
            Pending ({todoText.filter((Ele) => Ele.completed == false).length})
          </span>
          <span className="text-success">
            Completed ({todoText.filter((Ele) => Ele.completed == true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Suphanath Wangthip 640612098
        </p>
      </div>
    </div>
  );
}
