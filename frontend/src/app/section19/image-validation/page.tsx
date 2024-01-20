import Image from "next/image";
import { useState, useRef, type ChangeEvent } from "react";
import { useMutation, gql } from "@apollo/client";
import { checkValidationFile } from "@/lib/validationFile";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageRefPage() {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

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
