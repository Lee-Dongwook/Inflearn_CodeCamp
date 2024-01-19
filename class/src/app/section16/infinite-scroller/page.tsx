import { useQuery, gql } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";

interface Board {
  _id: number;
  title: string;
  writer: string;
}

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function InfiniteScrollPage() {
  const { data, fetchMore } = useQuery(FETCH_BOARDS);

  const onLoadMore = () => {
    if (data) {
      fetchMore({
        variables: { page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult.fetchBoards === undefined) {
            return {
              fetchBoards: [...prev.fetchBoards],
            };
          }
          return {
            fetchBoards: [...prev.fetchBoards, fetchMoreResult.fetchBoards],
          };
        },
      });
    }
  };

  return (
    <div>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore}>
        {data?.fetchBoards.map((el: Board) => (
          <div key={el._id}>
            <span style={{ margin: "10px" }}>{el.title}</span>
            <span style={{ margin: "10px" }}>{el.writer}</span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
