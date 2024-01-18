import { useRouter } from "next/router";
import React from "react";

export default function DynamicRoutePage() {
  const router = useRouter();

  const onClickFirstDetailMove = () => {
    router.push("/section05/dynamic-route/1");
  };

  const onClickSecondDetailMove = () => {
    router.push("/section05/static-route/2");
  };

  return (
    <>
      <button onClick={onClickFirstDetailMove}>
        첫 상세 페이지로 이동합니다.
      </button>
      <button onClick={onClickSecondDetailMove}>
        두번째 상세 페이지로 이동합니다.
      </button>
    </>
  );
}
