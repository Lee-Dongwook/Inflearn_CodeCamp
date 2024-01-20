interface Board {
  _id: number;
  title: string;
  contents: string;
}

interface fetchBoards {
  fetchBoards: Board[];
}

interface BoardListProps {
  data?: fetchBoards;
}

export default function BoardList(props: BoardListProps) {
  return (
    <>
      {props.data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.title}</span>
          <span>{el.contents}</span>
        </div>
      ))}
    </>
  );
}
