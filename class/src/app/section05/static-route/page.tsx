import { useRouter } from "next/router";
import React from "react";

export default function StaticRoutePage() {
  const router = useRouter();

  const onClickMove = () => {
    router.push("/section05/static-route-moved");
  };

  const onClickFirstDetailMove = () => {
    router.push("/section05/static-route-moved/1");
  };

  const onClickSecondDetailMove = () => {
    router.push("/section05/static-route-moved/2");
  };

  return (
    <>
      <button onClick={onClickMove}>페이지를 이동합니다.</button>
      <button onClick={onClickFirstDetailMove}>
        첫 상세 페이지로 이동합니다.
      </button>
      <button onClick={onClickSecondDetailMove}>
        두번째 상세 페이지로 이동합니다.
      </button>
    </>
  );
}
