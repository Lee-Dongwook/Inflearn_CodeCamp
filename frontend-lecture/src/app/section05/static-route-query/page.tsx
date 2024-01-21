import React from "react";
import { useQuery, gql } from "@apollo/client";

interface BoardData {
  writer: string;
  title: string;
  contents: string;
}

interface FetchBoardData {
  fetchBoard: BoardData;
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

export default function StaticRouteQueryPage() {
  const { data }: { data: FetchBoardData | undefined } = useQuery(FETCH_BOARD);

  return (
    <>
      {data && (
        <>
          <p>작성자 : {data.fetchBoard.writer}</p>
          <p>제목 : {data.fetchBoard.title}</p>
          <p>내용 : {data.fetchBoard.contents}</p>
        </>
      )}
    </>
  );
}
