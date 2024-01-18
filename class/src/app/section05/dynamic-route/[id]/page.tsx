import { useRouter } from "next/router";
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
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      number
      writer
      title
      contents
    }
  }
`;

export default function DynamicRouteQueryPage() {
  const router = useRouter();

  const { data }: { data: FetchBoardData | undefined } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.id) },
  });

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
