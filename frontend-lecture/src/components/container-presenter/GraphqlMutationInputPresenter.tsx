import React from "react";

interface GraphqlMutationInputPresenterProps {
  writer: string;
  title: string;
  contents: string;
  onChangeWriter: (value: string) => void;
  onChangeTitle: (value: string) => void;
  onChangeContents: (value: string) => void;
  onClickSubmit: () => void;
}

const GraphqlMutationInputPresenter: React.FC<
  GraphqlMutationInputPresenterProps
> = ({
  writer,
  title,
  contents,
  onChangeWriter,
  onChangeTitle,
  onChangeContents,
  onClickSubmit,
}) => {
  return (
    <>
      작성자 :{" "}
      <input
        type="text"
        value={writer}
        onChange={(e) => onChangeWriter(e.target.value)}
      />
      제목 :{" "}
      <input
        type="text"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
      내용 :{" "}
      <input
        type="text"
        value={contents}
        onChange={(e) => onChangeContents(e.target.value)}
      />
      <button onClick={onClickSubmit}>Graphql-Api 요청하기</button>
    </>
  );
};

export default GraphqlMutationInputPresenter;
