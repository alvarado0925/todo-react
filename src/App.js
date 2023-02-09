import React from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";
//import './App.css';

const defaultTodos = [
  { text: "Hacer mercado", completed: false },
  { text: "Pasear al perro", completed: true },
  { text: "Cortar manzana", completed: true },
  { text: "Comprar zapatos", completed: false },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  let searchedTodos = [];
  if (searchValue.length > 0) {
    searchedTodos = todos.filter(todo => {
      return todo.text.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    });
  } else {
    searchedTodos = todos;
  }

  const completeToggleTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !todos[todoIndex].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <div className="card col-lg-7 col-md-12 col-sm-12">
          <div className="card-body">
            <h1 className="card-header text-primary ps-0">TODO React</h1>
            <TodoCounter
              total={totalTodos}
              completed={completedTodos}
            />
            <TodoSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />

            <TodoList>
              {searchedTodos.map((todo, index) => (
                <TodoItem
                  key={index}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeToggleTodo(todo.text)}
                  onDelete={() => deleteTodo(todo.text)}
                />
              ))}
            </TodoList>

            <CreateTodoButton />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
