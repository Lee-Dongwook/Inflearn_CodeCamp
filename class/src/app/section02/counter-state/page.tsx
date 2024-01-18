import { useState } from "react";

export default function CounterLetDocumentPage() {
  const [number, setNumber] = useState<number>(0);

  const onClickCountUp = (): void => {
    setNumber(number + 1);
  };
  const onClickCountDown = (): void => {
    setNumber(number - 1);
  };

  return (
    <div>
      <div>{number}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
      <button onClick={onClickCountDown}>카운트 내리기</button>
    </div>
  );
}
