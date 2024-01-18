"use client";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const testGql = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationInputPage() {
  const [writer, setWriter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [testFunction] = useMutation(testGql);

  const onChangeWriter = () => {};

  const onChangeTitle = () => {};

  const onChangeContents = () => {};

  const onClickSubmit = async () => {
    const result = await testFunction({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
  };

  return (
    <>
      작성자 : <input type="text" onChange={onChangeWriter} />
      제목 : <input type="text" onChange={onChangeTitle} />
      내용 : <input type="text" onChange={onChangeContents} />
      <button onClick={onClickSubmit}>Graphql-Api 요청하기</button>
    </>
  );
}
