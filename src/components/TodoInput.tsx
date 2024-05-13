import check_icon from "../assets/icon-check.svg";

type AddTodo = (todo: string) => void;
const TodoInput = ({ addTodo }: { addTodo: AddTodo }) => {
  return (
    <div className="todo_list">
      <div className="todos_container flex ps-4 gap-2">
        {
          //<div className="check_button p-3 size-3 self-center "></div>
        }
        <button className="check_button self-center">
          <div className="check_box p-2 size-2">
            <img
              src={check_icon}
              alt="cross icon"
              className=" bg-transparent"
            />
          </div>
        </button>
        <input
          type="text"
          placeholder="Create a new todo"
          className="w-full p-4 rounded-md outline-none"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const inpuElement = event.target as HTMLInputElement;
              console.log(inpuElement.value);
              addTodo(inpuElement.value);
              inpuElement.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default TodoInput;
