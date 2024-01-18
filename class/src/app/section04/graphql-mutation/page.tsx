"use client";
import React from "react";
import { useMutation, gql } from "@apollo/client";

const testGql = gql`
  mutation {
    createBoard(
      writer: "동욱"
      title: "안녕하세요"
      contents: "graphql을 사용해봤습니다."
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [testFunction] = useMutation(testGql);

  const onClickSubmit = async () => {
    const result = await testFunction();
    console.log(result);
  };

  return (
    <>
      <button onClick={onClickSubmit}>Graphql-Api 요청하기</button>
    </>
  );
}
