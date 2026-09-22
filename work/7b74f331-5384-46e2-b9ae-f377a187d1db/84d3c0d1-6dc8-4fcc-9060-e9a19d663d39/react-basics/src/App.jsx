import Counter from "./components/Counter.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
  return (
    <main className="app-shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">React 状态练习</p>
          <h1>今日进度</h1>
        </div>
        <p className="date-mark" aria-label="练习主题">
          状态 · 事件 · 列表
        </p>
      </header>

      <div className="workspace">
        <Counter />
        <TodoList />
      </div>

      <footer>小步完成，也算前进。</footer>
    </main>
  );
}

export default App;
