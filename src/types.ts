type HandleCheck = (completed: boolean, id: number) => void;
type HandleCheckAll = (completed: boolean) => void;
type RemoveTodo = (id: number) => void;
type AddTodo = (todo: string) => void;
type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

export enum filterStateOptions {
  all = "todos",
  active = "active",
  completed = "completed",
}

export type { HandleCheck, RemoveTodo, HandleCheckAll, AddTodo, TodoType };
