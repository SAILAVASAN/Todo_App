import React, { useEffect, useState } from "react";
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from "./api";
import AddTodo from "./components/addTodo";
import TodoList from "./components/todoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await fetchTodos();
    if (res.success) setTodos(res.data);
  };

  const handleAdd = async (text) => {
    const res = await createTodo(text);
    if (res.success) {
      setTodos([res.data, ...todos]);
      showPopup("Todo added successfully");
    }
  };

  const handleToggle = async (id) => {
    const res = await toggleTodo(id);
    if (res.success) {
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
      showPopup("Todo updated ");
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteTodo(id);
    if (res.success) {
      setTodos(todos.filter((t) => t._id !== id));
      showPopup("Todo deleted ");
    }
  };


  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 2000); 
  };

  return (
    <div className="app-container">
      <h1>My Todo App</h1>
      <AddTodo onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />


      {popup && <div className="popup">{popup}</div>}
    </div>
  );
}

export default App;
