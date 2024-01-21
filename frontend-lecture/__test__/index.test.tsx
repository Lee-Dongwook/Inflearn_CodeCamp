import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const JestUnitPage = (): JSX.Element => {
  return (
    <>
      <div>
        안녕하세요 이동욱입니다.
        <input type="text" />
        <button>안녕하세요</button>
      </div>
    </>
  );
};

const JestUnitButtonClickPage = (): JSX.Element => {
  const [count, setCount] = useState(0);

  const onClickCountUp = (): void => {
    setCount((prev: number) => prev + 1);
  };

  return (
    <>
      <div role="count">{count}</div>
      <button role="count-button" onClick={onClickCountUp}>
        카운트 올리기
      </button>
    </>
  );
};

it("간단한 렌더링 테스트", () => {
  render(<JestUnitPage />);

  const testString = screen.getByText("안녕하세요 이동욱입니다.");
  expect(testString).toBeInTheDocument();
});

it("간단한 스냅샷 테스트", () => {
  const result = render(<JestUnitPage />);
  expect(result.container).toMatchSnapshot();
});

it("카운트 올리기 버튼의 동작 여부 테스트", () => {
  render(<JestUnitButtonClickPage />);

  fireEvent.click(screen.getByRole("count-button"));

  expect(screen.getByRole("count")).toHaveTextContent("1");
});
