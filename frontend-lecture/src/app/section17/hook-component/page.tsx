import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function FunctionCounterPage() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);

  // ComponentDidMount
  //   useEffect(() => {
  //     console.log("컴포넌트가 마운트 되었습니다.");
  //   }, []);

  // ComponentDidMount + ComponentDidUpdate
  //   useEffect(() => {
  //     console.log("컴포넌트가 업데이트 되었습니다.");
  //   }, []);

  // ComponentWillUnMount와 동일
  //   useEffect(() => {
  //     return () => {
  //       console.log("컴포넌트가 곧 언마운트 됩니다.");
  //     };
  //   }, []);

  useEffect(() => {
    console.log("컴포넌트가 마운트 됩니다.");

    return () => {
      console.log("컴포넌트가 언마운트 됩니다.");
    };
  });

  const onClickCountUp = (): void => {
    console.log(count);
    setCount(count + 1);
  };

  const onClickMove = (): void => {
    router.push("/");
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
      <button onClick={onClickMove}>나가기</button>
    </>
  );
}
