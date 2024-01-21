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

const FETCH_BOARD_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function PaginationLastPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch } = useQuery<FetchBoardData>(FETCH_BOARD, {
    variables: { page: currentPage },
  });

  const { data: dataBoardsCount } = useQuery(FETCH_BOARD_COUNT);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  const onClickPage = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const clickedPage = Number(event.currentTarget.id);
    setCurrentPage(clickedPage);
    void refetch({ page: clickedPage });
  };

  const onClickPrevPage = (): void => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 10);
    void refetch({ page: currentPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (currentPage + 10 <= lastPage) {
      setCurrentPage(currentPage + 10);
      void refetch({ page: currentPage + 10 });
    }
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

      {new Array(10).fill("").map(
        (_, idx) =>
          idx + currentPage <= lastPage && (
            <span
              key={idx + currentPage}
              id={String(idx + currentPage)}
              onClick={onClickPage}
              style={{ margin: "5px" }}
            >
              {idx + currentPage}
            </span>
          )
      )}

      <span onClick={onClickNextPage}>다음 페이지</span>
    </div>
  );
}
