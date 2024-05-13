import "./App.css";

const TodoItem = ({ todo, index }) => {
  const { drag, hover } = useGesture({
    onDrag: (event) => {
      // Handle drag movement logic
    },
  });

  return (
    <div
      key={todo.id}
      className="todos_container todo flex px-4 gap-2 border-b-2 "
      {...drag}
    >
      <button
        className={`check_button self-center ${
          todo.completed ? "checked_button" : ""
        }`}
        onClick={() => {
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
    </div>
  );

  return (
    <div
      className={`flex items-center border rounded-md p-3 ${
        hover ? "bg-gray-200" : ""
      }`} // Tailwind CSS classes
      {...drag}
    >
      {/* ... your todo item rendering logic */}
    </div>
  );
};

export default TodoItem;
