import { useState } from "react";
import TodoItem from "./TodoItem.jsx";

function createTodo(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
}

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  function handleSubmit(event) {
    event.preventDefault();
    const title = input.trim();

    if (!title) return;

    setTodos((current) => [...current, createTodo(title)]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    <section className="todo-panel" aria-labelledby="todo-title">
      <div className="section-heading todo-heading">
        <p className="section-number">02</p>
        <div>
          <h2 id="todo-title">待办清单</h2>
          <p aria-live="polite">还有 {remainingCount} 项未完成</p>
        </div>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="new-todo">添加一件要做的事</label>
        <div className="input-row">
          <input
            id="new-todo"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="例如：阅读 React 讲义"
            autoComplete="off"
          />
          <button className="primary-button" type="submit">
            添加
          </button>
        </div>
      </form>

      {todos.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">✓</span>
          <p>清单还是空的</p>
          <small>写下第一件要完成的事吧。</small>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodoList;
