# React 快速入门

这份讲义面向已经熟悉 HTML、CSS 和现代 JavaScript 的前端开发者。重点不是记忆 API，而是建立 React 的核心心智模型：**界面是状态的函数**。

## 1. 从操作 DOM 到描述界面

传统写法通常先找到 DOM，再逐步修改它：

```js
const button = document.querySelector("button");
const output = document.querySelector("output");
let count = 0;

button.addEventListener("click", () => {
  count += 1;
  output.textContent = count;
});
```

React 中，我们保存状态并描述该状态对应的界面。状态变化后，React 重新执行组件并更新必要的 DOM：

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((current) => current + 1)}>
      点击次数：{count}
    </button>
  );
}
```

不要把“重新执行组件”理解为重建整个页面。React 会比较前后渲染结果，只提交必要的 DOM 更新。

## 2. 用 Vite 创建项目

需要本机已安装当前维护版本的 Node.js。

```bash
npm create vite@latest react-basics -- --template react
cd react-basics
npm install
npm run dev
```

常用结构：

```text
react-basics/
├─ src/
│  ├─ App.jsx       # 页面根组件
│  ├─ main.jsx      # 将 React 挂载到页面
│  └─ index.css     # 全局样式
├─ index.html
└─ package.json
```

提交前运行 `npm run build`，确认生产构建可以完成。

## 3. 组件与 JSX

React 组件是返回界面描述的 JavaScript 函数。组件名称必须以大写字母开头。

```jsx
function Greeting() {
  const name = "Ada";
  return <h1>你好，{name}</h1>;
}
```

JSX 看起来像 HTML，但有几项常见差异：

- JavaScript 表达式写在 `{}` 中。
- CSS 类名使用 `className`。
- 事件名使用驼峰形式，例如 `onClick`、`onChange`。
- 组件必须返回一个根节点；不想增加 DOM 时可使用 Fragment：`<>...</>`。
- 标签必须闭合，例如 `<input />`。

## 4. 用 props 传入数据

props 是父组件传给子组件的只读输入。子组件不应修改 props。

```jsx
function TodoItem({ title, completed, onToggle }) {
  return (
    <label>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span>{title}</span>
    </label>
  );
}
```

父组件可以同时传递数据和事件回调：

```jsx
<TodoItem
  title="阅读 React 讲义"
  completed={false}
  onToggle={() => console.log("toggle")}
/>
```

数据向下传递，事件通过回调向上报告，这是 React 中常见的单向数据流。

## 5. 用 state 保存交互状态

`useState` 返回当前状态和更新函数。调用更新函数会请求一次新的渲染。

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount((current) => Math.max(0, current - 1));
  }

  return (
    <section>
      <output>{count}</output>
      <button onClick={decrement} disabled={count === 0}>减少</button>
      <button onClick={() => setCount((current) => current + 1)}>增加</button>
      <button onClick={() => setCount(0)}>重置</button>
    </section>
  );
}
```

当新状态依赖旧状态时，使用函数式更新 `setCount(current => ...)`，避免读取过期值。

状态应放在需要共享它的组件最近的共同父组件中。能通过现有 props 或 state 计算出的值通常不需要再存一份 state。

## 6. 表单与事件

受控输入框的值来自 state，输入事件负责更新 state：

```jsx
function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="待办事项"
      />
      <button type="submit">添加</button>
    </form>
  );
}
```

把提交逻辑放在 `form` 的 `onSubmit` 中，键盘回车和点击按钮都会得到一致行为。

## 7. 条件与列表渲染

条件渲染可以使用普通 JavaScript 表达式：

```jsx
{todos.length === 0 ? <p>暂无待办事项</p> : <TodoList todos={todos} />}
```

用 `map` 渲染列表，并为同级元素提供稳定且唯一的 `key`：

```jsx
<ul>
  {todos.map((todo) => (
    <TodoItem key={todo.id} {...todo} />
  ))}
</ul>
```

`key` 帮助 React 识别某一项在增删和排序前后是否仍是同一项。会变化的列表不要使用数组下标作为 `key`。

## 8. 不可变更新

对象和数组 state 应创建新值，而不是原地修改：

```jsx
// 添加
setTodos((current) => [...current, newTodo]);

// 切换完成状态
setTodos((current) =>
  current.map((todo) =>
    todo.id === targetId ? { ...todo, completed: !todo.completed } : todo
  )
);

// 删除
setTodos((current) => current.filter((todo) => todo.id !== targetId));
```

这样可以让状态变化保持可预测，也让 React 正确识别引用变化。

## 9. 常见误区

- 在渲染期间直接调用状态更新函数，造成无限重新渲染。
- 直接修改 state，例如 `todos.push(item)` 或 `todo.completed = true`。
- 把可以计算的值重复存入 state，导致多个状态不同步。
- 写成 `onClick={handleClick()}`，导致函数在渲染时执行；应传函数 `onClick={handleClick}`。
- 使用数组下标作为会增删列表的 `key`。
- 让子组件直接修改父组件传入的 props。

完成第一道作业时，可以配合阅读 [React 核心速查表](./react-cheatsheet.md)。
