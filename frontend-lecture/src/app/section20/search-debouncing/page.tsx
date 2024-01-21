import React, { useState, type ChangeEvent, type MouseEvent } from "react";
import { useQuery, gql } from "@apollo/client";
import * as load from "lodash";

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
  query fetchBoards($page: Int!, $search: String!) {
    fetchBoard(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function PaginationWithSearchDebouncingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery<FetchBoardData>(FETCH_BOARD, {
    variables: { page: currentPage },
  });

  const getDebounce = load.debounce((value) => {
    void refetch({ search: value, page: 1 });
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value);
  };

  const onClickPage = (event: React.MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  return (
    <div>
      검색어 입력: <input type="text" onChange={onChangeSearch} />
      {data?.fetchBoard.map((el) => (
        <div key={el._id} id={el.writer}>
          <span>
            <input type="checkbox" />
          </span>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill("").map((_, idx) => (
        <span key={idx + 1} id={String(idx + 1)} onClick={onClickPage}>
          {idx + 1}
        </span>
      ))}
    </div>
  );
}
