import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import GraphqlMutationInputPresenter from "@/components/container-presenter/GraphqlMutationInputPresenter";

const testGql = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

const GraphqlMutationInputContainer = () => {
  const [writer, setWriter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [testFunction] = useMutation(testGql);

  const onChangeWriter = (value: string) => setWriter(value);
  const onChangeTitle = (value: string) => setTitle(value);
  const onChangeContents = (value: string) => setContents(value);

  const onClickSubmit = async () => {
    const result = await testFunction({
      variables: { writer, title, contents },
    });
    console.log(result);
  };

  return (
    <GraphqlMutationInputPresenter
      writer={writer}
      title={title}
      contents={contents}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
    />
  );
};

export default GraphqlMutationInputContainer;
