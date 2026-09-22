import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount((current) => Math.max(0, current - 1));
  }

  return (
    <section className="counter-panel" aria-labelledby="counter-title">
      <div className="section-heading">
        <p className="section-number">01</p>
        <div>
          <h2 id="counter-title">专注计数</h2>
          <p>记录今天完成的小目标</p>
        </div>
      </div>

      <output className="counter-value" aria-live="polite">
        {count}
      </output>

      <div className="counter-actions">
        <button type="button" onClick={decrement} disabled={count === 0}>
          减少
        </button>
        <button
          className="primary-button"
          type="button"
          onClick={() => setCount((current) => current + 1)}
        >
          增加
        </button>
        <button type="button" onClick={() => setCount(0)}>
          重置
        </button>
      </div>
    </section>
  );
}

export default Counter;
