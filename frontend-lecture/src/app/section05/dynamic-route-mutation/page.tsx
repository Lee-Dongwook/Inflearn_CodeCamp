"use client";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, gql } from "@apollo/client";

interface BoardInfo {
  _id: number;
  number: number;
  message: string;
}

interface FetchBoardInfo {
  createBoard: BoardInfo;
}

const testGql = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function DynamicRouteMutationPage() {
  const router = useRouter();

  const [testFunction] = useMutation(testGql);

  const onClickSubmit = async () => {
    try {
      const result = await testFunction({
        variables: {
          writer: "동욱",
          title: "안녕하세요",
          contents: "graphql을 사용해봤습니다.",
        },
      });
      console.log(result);
      console.log(result.data.createBoard.number);

      const pageNumber = (result.data satisfies FetchBoardInfo).createBoard
        .number;

      router.push(`/section05/dynamic-route-mutation/${pageNumber.toString()}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <button onClick={onClickSubmit}>Graphql-Api 요청하기</button>
    </>
  );
}
