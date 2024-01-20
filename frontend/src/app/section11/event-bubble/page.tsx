import React from "react";
import { useQuery, gql } from "@apollo/client";

interface Board {
  number: number;
  writer: string;
  title: string;
  contents: string;
}

interface FetchBoardData {
  fetchBoard: Board[];
}

const FETCH_BOARD = gql`
  query {
    fetchBoard(number: 1) {
      number
      writer
      title
      contents
    }
  }
`;

export default function EventBubblePage() {
  const { data } = useQuery<FetchBoardData>(FETCH_BOARD);

  const onClickDiv = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedDiv = event.currentTarget;
    alert(`${clickedDiv.id}님이 Div를 클릭하였습니다.`);
  };

  return (
    <div onClick={onClickDiv}>
      {data?.fetchBoard.map((el, idx) => (
        <div key={idx} id={el.writer}>
          <span>
            <input type="checkbox" />
          </span>
          <span>{el.number}</span>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
