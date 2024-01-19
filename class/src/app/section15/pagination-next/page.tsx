import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

interface Board {
  _id: number;
  writer: string;
  title: string;
  contents: string;
}

interface FetchBoardData {
  fetchBoard: Board[];
}

const FETCH_BOARD = gql`
  query fetchBoards($page: Int!) {
    fetchBoard(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function PaginationNextPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch } = useQuery<FetchBoardData>(FETCH_BOARD, {
    variables: { page: currentPage },
  });

  const onClickPage = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const clickedPage = Number(event.currentTarget.id);
    setCurrentPage(clickedPage);
    void refetch({ page: clickedPage });
  };

  const onClickPrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 10);
      void refetch({ page: 1 });
    }
  };

  const onClickNextPage = (): void => {
    setCurrentPage(currentPage + 10);
    void refetch({ page: 31 });
  };

  return (
    <div>
      {data?.fetchBoard.map((el) => (
        <div key={el._id} id={el.writer}>
          <span>
            <input type="checkbox" />
          </span>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}

      <span onClick={onClickPrevPage}>이전 페이지</span>

      {new Array(10).fill("").map((_, idx) => (
        <span
          key={idx + currentPage}
          id={String(idx + currentPage)}
          onClick={onClickPage}
        >
          {idx + currentPage}
        </span>
      ))}

      <span onClick={onClickNextPage}>다음 페이지</span>
    </div>
  );
}
