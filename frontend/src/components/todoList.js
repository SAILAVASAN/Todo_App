import React from "react";
import TodoItem from "./todoItem";

const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <div className="todos-list">
      {todos.length === 0 ? (
        <p className="empty">No todos yet </p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
