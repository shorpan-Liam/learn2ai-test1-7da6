# React 状态与事件练习

一个使用 Vite + React 构建的计数器和待办事项应用。

## 安装与运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 组件与状态

- `App`：负责页面整体布局，组合两个功能区域。
- `Counter`：独立管理 `count` 状态，提供增加、减少和重置操作。
- `TodoList`：管理受控输入框 `input` 和待办数组 `todos`，负责添加、切换与删除逻辑；未完成数量直接从 `todos` 派生，不保存重复状态。
- `TodoItem`：通过 props 接收单条待办数据与事件回调，不直接修改 props。

## 不可变更新与稳定 key

新增待办使用展开语法创建新数组，切换状态使用 `map` 创建新对象，删除使用 `filter` 创建新数组。每条待办在创建时通过 `crypto.randomUUID()` 获得稳定且唯一的 ID，并以该 ID 作为 React 列表的 `key`，没有使用数组下标。

这一实现依据 `materials/react-quickstart.md` 和 `materials/react-cheatsheet.md`：当新状态依赖旧状态时使用函数式更新，并通过表单的 `onSubmit` 统一支持按钮点击和回车提交。

## 人工验证记录

- [x] 从 `0` 点击“减少”不会出现负数；增加后可以减少；点击“重置”回到 `0`。
- [x] 空字符串和纯空格无法创建待办；正常文本可以通过“添加”按钮和回车添加；添加后输入框清空。
- [x] 切换完成状态后未完成数量正确变化；删除事项后列表和数量同步更新。
- [x] 删除全部事项后显示“清单还是空的”空状态。
- [x] 使用 Chrome 自动执行完整交互流程，控制台没有 React 错误或 `key` 警告。
- [x] `npm run build` 成功（Vite 8.3.0，19 个模块完成转换）。
