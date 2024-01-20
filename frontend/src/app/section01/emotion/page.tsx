"use client";
import Image from "next/image";
import { MyEmail, MyEmailInput, MyButton } from "@/styles/01-02-emotion";

export default function EmotionPage() {
  return (
    <div>
      <MyEmail>이메일: </MyEmail>
      <MyEmailInput type="text" />
      <MyButton>클릭하세요!</MyButton>
      <Image src="/next.svg" alt="샘플 이미지" width={200} height={200} />
    </div>
  );
}
