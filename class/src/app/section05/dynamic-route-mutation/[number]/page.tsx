import { useRouter } from "next/router";
import React from "react";
import { useQuery, gql } from "@apollo/client";

interface BoardData {
  number: number;
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

export default function DynamicRouteMutationPage() {
  const router = useRouter();

  const { data }: { data: FetchBoardData | undefined } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number) },
  });

  return (
    <>
      {data && (
        <>
          <h3>{router.query.number}번 게시글</h3>
          <p>작성자 : {data.fetchBoard.writer}</p>
          <p>제목 : {data.fetchBoard.title}</p>
          <p>내용 : {data.fetchBoard.contents}</p>
        </>
      )}
    </>
  );
}
