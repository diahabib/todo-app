//import { useState } from "react";
import "./App.css";
import moon_icon from "./assets/icon-moon.svg";
import sun_icon from "./assets/icon-sun.svg";
import check_icon from "./assets/icon-check.svg";
import cross_icon from "./assets/icon-cross.svg";
import { useState, useEffect } from "react";

function App() {
  type todoType = {
    id: number;
    text: string;
    completed: boolean;
  };

  const todoList: todoType[] = [
    {
      id: 1,
      text: "Take out the trash",
      completed: false,
    },
    {
      id: 2,
      text: "Grocery shopping",
      completed: false,
    },
    {
      id: 3,
      text: "Clean the house",
      completed: false,
    },
    {
      id: 4,
      text: "Cook dinner",
      completed: true,
    },
    {
      id: 5,
      text: "Learn React",
      completed: true,
    },
  ];

  const [todos, setTodos] = useState(todoList);

  /*const handleCheck = (todo: todoType) => {
    todo.completed = todo.completed ? false : true;
  };*/
  /*
  const quickSort = (tdos: Array<todoType>): Array<todoType> => {
    if (tdos.length <= 1) {
      return tdos;
    }

    const pivot = tdos[Math.floor(tdos.length / 2)];
    const left = [];
    const right = [];

    for (let i = 0; i < tdos.length; i++) {
      if (i !== Math.floor(tdos.length / 2)) {
        if (tdos[i].completed === false && pivot.completed === false) {
          if (tdos[i].id !== pivot.id) {
            left.push(tdos[i]);
          }
        } else if (tdos[i].completed === true && pivot.completed === true) {
          if (tdos[i].id !== pivot.id) {
            right.push(tdos[i]);
          }
        } else if (tdos[i].completed === false && pivot.completed === true) {
          left.push(tdos[i]);
        } else {
          right.push(tdos[i]);
        }
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };
*/

  const sortTodos = (): Array<todoType> => {
    return [...todos].sort((a, b) => {
      // Mettez d'abord les todos non complétés avant les todos complétés
      if (a.completed && !b.completed) {
        return 1; // b vient avant a
      } else if (!a.completed && b.completed) {
        return -1; // a vient avant b
      } else {
        // Si les deux todos sont de même état (complétés ou non complétés), conservez l'ordre existant
        return 0;
      }
    });
  };
  const handleCheck = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
    setTodos(sortTodos());
  };

  const addTodo = (newTodo: string) => {
    const todo: todoType = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearTodos = () => {
    //tdos.splice(0, tdos.length);
    //setTodos([...tdos]);
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const countActiveTodos = (tdos: Array<todoType>) => {
    return tdos.filter((todo) => !todo.completed).length;
  };
  let isLaptop = window.innerWidth >= 1024;

  const [isLaptopState, setIsLaptopState] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      isLaptop = window.innerWidth >= 1024;
      setIsLaptopState(isLaptop); // Trigger a re-render with the updated value
    };

    // ... rest of the code
  }, []);

  //console.log(activeTodos(todos));
  enum filterStateOptions {
    all = "todos",
    active = "active",
    completed = "completed",
  }

  const [filterState, setState] = useState(filterStateOptions.all);

  const filterTodos = () => {
    switch (filterState) {
      case filterStateOptions.all:
        return todos;
        break;
      case filterStateOptions.active:
        return todos.filter((todo) => !todo.completed);
        break;
      case filterStateOptions.completed:
        return todos.filter((todo) => todo.completed);
        break;
      default:
        return todos;
    }
  };

  const changeTodosState = (state: filterStateOptions) => {
    setState(state);
    filterTodos();
  };

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div
        className={`containerr ${
          darkMode ? "dark" : ""
        } flex flex-col px-6  py-12 gap-y-8 lg:px-[35%] `}
      >
        <header className="flex justify-between  lg:items-center">
          <h1 className="text-white text-4xl font-extrabold">TODO</h1>
          <button onClick={toggleDarkMode}>
            <img src={darkMode ? sun_icon : moon_icon} alt="theme icon" />
          </button>
        </header>

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

        <div className="todo_list">
          {filterTodos().map((todo) => {
            return (
              <div
                key={todo.id}
                className="todos_container todo flex px-4 gap-2 border-b-2 "
              >
                <button
                  className={`check_button self-center ${
                    todo.completed ? "checked_button" : ""
                  }`}
                  onClick={() => {
                    handleCheck(todo.id);
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
          })}
          <div className="todos_container todos-options flex justify-between p-3 px-4 gap-x-2 text-sm pb-0 lg:pb-3">
            <div className="text-nowrap">
              {countActiveTodos(todos)} items left
            </div>

            <div className="flex lg:flex-row-reverse lg:gap-8 justify-between flex-wrap lg:flex-nowrap relative">
              <div className="button_clear-items self-center basis-full text-right lg:basis-3/6">
                <button
                  onClick={() => {
                    clearTodos();
                  }}
                >
                  Clear Completed
                </button>
              </div>
              <div className="flex gap-4 self-center basis-full lg:basis-3/6 relative top-16 lg:top-0 text-center">
                <button
                  className={`filter-items ${
                    filterState === filterStateOptions.all
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={() => {
                    changeTodosState(filterStateOptions.all);
                  }}
                >
                  All
                </button>
                <button
                  className={`filter-items ${
                    filterState === filterStateOptions.active
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={() => {
                    changeTodosState(filterStateOptions.active);
                  }}
                >
                  Active
                </button>
                <button
                  className={`filter-items ${
                    filterState === filterStateOptions.completed
                      ? "selectedOption"
                      : ""
                  }`}
                  onClick={() => {
                    changeTodosState(filterStateOptions.completed);
                  }}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {!isLaptop && (
            <div className="todos_container mt-7 p-6 px-4 gap-2"></div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
