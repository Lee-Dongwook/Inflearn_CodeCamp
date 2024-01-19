import { useQuery, gql } from "@apollo/client";
import BoardList from "@/components/board-list";
import Pagination from "@/components/pagination";

const Fetch_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function MapBoardPage(): JSX.Element {
  const { data, refetch } = useQuery(Fetch_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  const lastPage =
    dataBoardsCount !== null ? Math.ceil(dataBoardsCount?.fetchBoardsCount) : 1;

  return (
    <>
      <BoardList data={data} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </>
  );
}
