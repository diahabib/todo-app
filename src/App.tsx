//import { useState } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import FilterOptions from "./components/FIlterOptions";

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

function App() {
  const [todos, setTodos] = useState(todoList);

  /*const handleCheck = (todo: todoType) => {
    todo.completed = todo.completed ? false : true;
  };*/
  /*
  const quickSort = (todos: todoType[], low = 0, high = todos.length - 1) => {
  if (low < high) {
    const pivotIndex = partition(todos, low, high);
    quickSort(todos, low, pivotIndex - 1);
    quickSort(todos, pivotIndex + 1, high);
  }
  return todos;
};

const partition = (todos: todoType[], low: number, high: number) => {
  const pivot = todos[high].completed;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (todos[j].completed <= pivot) {
      i++;
      [todos[i], todos[j]] = [todos[j], todos[i]]; // Swap elements
    }
  }

  [todos[i + 1], todos[high]] = [todos[high], todos[i + 1]]; // Swap pivot

  return i + 1;
};
*/

  const sortTodos = (todos: todoType[]) => {
    return todos.sort((todoA, todoB) => {
      if (todoA.completed && !todoB.completed) return -1;
      if (!todoA.completed && todoB.completed) return 1;
      return 0;
    });
  };

  const handleCheck = (tds: boolean, id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    if (!tds) rearrangeTodos(id);
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
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const rearrangeTodos = (id: number) => {
    setTodos((prevTodos) => {
      const todoToRearrange = prevTodos.find((todo) => todo.id === id);
      if (!todoToRearrange) return prevTodos;

      return [...prevTodos.filter((todo) => todo.id !== id), todoToRearrange];
    });
  };

  const countActiveTodos = (tdos: Array<todoType>) => {
    return tdos.filter((todo) => !todo.completed).length;
  };

  const [isLaptop, setIsLaptopState] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopState(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //console.log(activeTodos(todos));
  enum filterStateOptions {
    all = "todos",
    active = "active",
    completed = "completed",
  }

  const [filterState, setState] = useState(filterStateOptions.all.toString());

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

  const changeTodosState = (state: string) => {
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
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <TodoInput addTodo={addTodo} />

        <ul className="todo_list">
          {sortTodos(filterTodos()).map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleCheck={handleCheck}
                removeTodo={removeTodo}
              />
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
              <FilterOptions
                filterState={filterState}
                changeTodosState={changeTodosState}
              />
            </div>
          </div>

          {!isLaptop && (
            <div className="todos_container mt-7 p-6 px-4 gap-2"></div>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
