//import { useState } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import FilterOptions from "./components/FIlterOptions";
import todoList from "./todoList.json";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoType, filterStateOptions } from "./types";

function App() {
  const [todos, setTodos] = useState(todoList);
  const [filterState, setState] = useState(filterStateOptions.all.toString());
  const [isLaptop, setIsLaptopState] = useState(window.innerWidth >= 1024);

  const [darkMode, setDarkMode] = useState(false);

  const sortTodos = (todos: TodoType[]) => {
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

  const handleCheckAll = (checked: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: checked }))
    );
  };

  const addTodo = (newTodo: string) => {
    const todo: TodoType = {
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

  const countActiveTodos = (tdos: Array<TodoType>) => {
    return tdos.filter((todo) => !todo.completed).length;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopState(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //console.log(activeTodos(todos));

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`containerr ${
          darkMode ? "dark" : ""
        } flex flex-col px-6  py-12 gap-y-8 lg:px-[35%] `}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <TodoInput addTodo={addTodo} handleCheckAll={handleCheckAll} />

        <ul className="todo_list">
          {sortTodos(filterTodos()).map((todo, index) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                handleCheck={handleCheck}
                removeTodo={removeTodo}
                setTodos={setTodos}
                todos={todos}
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

        <p className="dnd_text text-center text-sm">
          Drag and drop to reorder list
        </p>
      </div>
    </DndProvider>
  );
}

export default App;
