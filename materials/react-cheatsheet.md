# React 核心速查表

## 组件与 props

```jsx
function Badge({ label, active = false }) {
  return <span className={active ? "badge active" : "badge"}>{label}</span>;
}

<Badge label="进行中" active />
```

- 组件名使用大写字母开头。
- props 是只读输入，可设置默认值。
- `children` 表示组件开始与结束标签之间的内容。

## useState

```jsx
import { useState } from "react";

const [count, setCount] = useState(0);
setCount(3);                              // 直接设置
setCount((current) => current + 1);       // 根据旧值更新
```

- Hook 只能在组件或自定义 Hook 顶层调用。
- 新状态依赖旧状态时使用函数式更新。
- 不要在渲染过程中无条件更新 state。

## 事件

```jsx
function SaveButton({ onSave }) {
  return <button onClick={onSave}>保存</button>;
}

function SearchBox({ query, onQueryChange }) {
  return (
    <input
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
    />
  );
}
```

传递函数引用：`onClick={handleClick}`。需要参数时传包装函数：`onClick={() => remove(id)}`。

## 条件渲染

```jsx
{isLoading && <p>加载中...</p>}
{error ? <p role="alert">{error}</p> : <Result />}
```

复杂分支可以在 `return` 前使用普通的 `if`。

## 列表渲染

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>
```

- `key` 在同级列表中必须唯一且稳定。
- 会增删或排序的列表不要使用数组下标作为 `key`。
- `key` 不会作为普通 prop 传入组件；需要 ID 时另传 `id`。

## 数组 state 的不可变更新

```jsx
// 添加
setItems((items) => [...items, newItem]);

// 更新
setItems((items) =>
  items.map((item) => item.id === id ? { ...item, done: true } : item)
);

// 删除
setItems((items) => items.filter((item) => item.id !== id));
```

避免 `push`、`pop`、`splice` 和直接修改对象属性。

## 派生值

```jsx
const remainingCount = todos.filter((todo) => !todo.completed).length;
```

能从当前 props 或 state 算出的值直接计算，不要再创建一份同步 state。

## 表单提交

```jsx
function handleSubmit(event) {
  event.preventDefault();
  const value = input.trim();
  if (!value) return;
  onAdd(value);
  setInput("");
}
```

- 用 `trim()` 阻止纯空白内容。
- 使用 `form onSubmit` 支持回车提交。
- 为输入框提供可见标签或 `aria-label`。

## 开发检查清单

- 每个组件是否只承担清晰、有限的职责？
- 状态是否放在需要共享它的最近共同父组件？
- 是否通过 props 传数据、通过回调报告事件？
- 是否避免直接修改对象和数组 state？
- 列表是否使用稳定 ID 作为 `key`？
- 表单是否能用键盘提交并阻止空内容？
- 按钮是否具有明确文本和正确的 `type`？
- 控制台是否没有错误或警告？
- `npm run build` 是否成功？

更完整的解释和示例见 [React 快速入门](./react-quickstart.md)。
