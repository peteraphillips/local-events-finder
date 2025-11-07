'use client';

import { useState } from 'react';

function MyButton({count, onClick}) {

  return <button onClick={onClick}>Clicked {count} times</button>;
}

export default function Home() {

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(`Button clicked ${count + 1} times`);
  }

  return (
    <div>
      <h1>Hello World</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
