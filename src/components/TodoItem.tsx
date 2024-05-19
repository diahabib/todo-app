import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import check_icon from "../assets/icon-check.svg";
import cross_icon from "../assets/icon-cross.svg";
import { HandleCheck, RemoveTodo, TodoType } from "../types";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem = ({
  todo,
  handleCheck,
  removeTodo,
  index,
  setTodos,
  todos,
}: {
  todo: TodoType;
  handleCheck: HandleCheck;
  removeTodo: RemoveTodo;
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "todo",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "todo",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        const newTodos = [...todos];
        const [removed] = newTodos.splice(draggedItem.index, 1);
        newTodos.splice(index, 0, removed);

        setTodos(newTodos);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <li
      className={`todos_container todo flex px-4 gap-2 border-b-2 ${
        isDragging ? "opacity-50" : ""
      }`}
      ref={ref}
    >
      <button
        className={`check_button self-center ${
          todo.completed ? "checked_button" : ""
        }`}
        onClick={() => {
          //handleCheck(todo.id);
          //rearangeTodos(todo.id, index);
          handleCheck(todo.completed, todo.id);
        }}
      >
        <div
          className={`check_box p-2 size-2  ${
            todo.completed ? "checkedBG " : ""
          }`}
        >
          <img
            src={check_icon}
            alt="check icon"
            className="check_button_icon"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </button>

      <input
        type="text"
        value={todo.text}
        className={`w-full p-4 text-black rounded-md outline-none ${
          todo.completed ? "completed_tasks text-[] line-through" : ""
        }`}
      />
      {!todo.completed && (
        <button className="delete_button">
          <img
            src={cross_icon}
            alt="cross icon"
            className=" self-center"
            onClick={() => {
              removeTodo(todo.id);
            }}
          />
        </button>
      )}
    </li>
  );
};

export default TodoItem;
