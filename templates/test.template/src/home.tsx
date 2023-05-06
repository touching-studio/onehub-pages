import './home.css';
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

type TestHomeTemplateProps = {
  name?: string;
};

let root: ReactDOM.Root;

function Template(props: TestHomeTemplateProps = { name: "World" }) {
  const [count, SetCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      SetCount(count + 1);
    }, 1000);
  });
  return (
    <>
      <h1>Hello, {props.name}!</h1>
      <div>Test state: {count}s.</div>
      <button
        onClick={() =>
          render({
            name: "Someone",
          })
        }
      >
        Change Name
      </button>
    </>
  );
}

export const render = (
  props: TestHomeTemplateProps,
  container?: HTMLElement
) => {
  if (container) {
    root = ReactDOM.createRoot(container);
  }
  root.render(<Template {...props} />);
};
