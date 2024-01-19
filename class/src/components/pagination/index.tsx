import { useState, type MouseEvent } from "react";
import type { ApolloQueryResult } from "@apollo/client";

interface PaginationProps {
  refetch: (variables?: any) => Promise<ApolloQueryResult<any>>;
  lastPage: number;
}

export default function Pagination(props: PaginationProps): JSX.Element {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    void props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = async (): Promise<void> => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      void props.refetch({ page: startPage + 10 });
    }
  };

  return (
    <div>
      <span onClick={onClickPrevPage}>이전페이지</span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= props.lastPage && (
            <span
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              style={{ margin: "10px" }}
            >
              {index + startPage}
            </span>
          )
      )}
      <span onClick={onClickNextPage}>다음페이지</span>
    </div>
  );
}
