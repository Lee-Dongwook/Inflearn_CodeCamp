import React from "react";
import axios from "axios";

type Data = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
};

export default function RestGetPage() {
  const onClickAsync = () => {
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log(result); // Promise
  };

  const onClickSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result); // Real Data
    console.log((result.data satisfies Data).title);
  };

  return (
    <div>
      <button onClick={onClickAsync}>Rest-Api 비동기 요청</button>
      <button onClick={onClickSync}>Rest-APi 동기 요청</button>
    </div>
  );
}
