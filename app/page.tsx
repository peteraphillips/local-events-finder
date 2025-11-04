import Image from "next/image";

export function MyButton() {
  return <button>Click Me</button>;
}

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <MyButton />
    </div>
  );
}
