import Image from "next/image";
import { useState, useRef, type ChangeEvent } from "react";
import { useMutation, gql } from "@apollo/client";
import { checkValidationFile } from "@/lib/validationFile";
import { write } from "fs";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function ImageWithBoardPage() {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createBoard] = useMutation(CREATE_BOARD);

  const fileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickSubmit = async (): Promise<void> => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer,
          password: "1234",
          title,
          contents,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    console.log(file);

    const isValidate = checkValidationFile(file);
    if (!isValidate) {
      return;
    }

    const result = await uploadFile({ variables: { file } });
    console.log(result.data?.uploadFile.url);
    setImageUrl(result.data?.uploadFile.url ?? "");
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
      작성자 : <input type="text" value={writer} onChange={onChangeWriter} />
      제목 : <input type="text" value={title} onChange={onChangeTitle} />
      내용 : <input type="text" value={contents} onChange={onChangeContent} />
      <button onClick={onClickSubmit}>GraphQL API 요청</button>
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "gray" }}
        onClick={onClickImage}
      >
        이미지 선택
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
      />
      <Image src={`https://storage.googleapis.com/${imageUrl}`} alt="사진" />
    </>
  );
}
