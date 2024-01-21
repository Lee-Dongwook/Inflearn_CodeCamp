"use client";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const testGql = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createBoard(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationProductPage() {
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
        seller: "동욱",
        createProductInput: {
          name: "아이폰 12 Pro",
          detail: "상태가 우수합니다.",
          price: 1000000,
        },
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
