import check_icon from "../assets/icon-check.svg";
import cross_icon from "../assets/icon-cross.svg";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type HandleCheck = (completed: boolean, id: number) => void;
type RemoveTodo = (id: number) => void;

const TodoItem = ({
  todo,
  handleCheck,
  removeTodo,
}: {
  todo: Todo;
  handleCheck: HandleCheck;
  removeTodo: RemoveTodo;
}) => {
  return (
    <li className="todos_container todo flex px-4 gap-2 border-b-2 ">
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
