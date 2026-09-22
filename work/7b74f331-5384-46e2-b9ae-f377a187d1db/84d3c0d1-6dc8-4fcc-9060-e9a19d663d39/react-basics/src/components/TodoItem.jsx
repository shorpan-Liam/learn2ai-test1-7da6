function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? "todo-item is-complete" : "todo-item"}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="checkmark" aria-hidden="true" />
        <span className="todo-title">{todo.title}</span>
      </label>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`删除待办：${todo.title}`}
        title="删除"
      >
        删除
      </button>
    </li>
  );
}

export default TodoItem;
