"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OpenApiWithUseEffectPage() {
  const [dogPicture, setDogPicture] = useState<string>("");

  const onClickSync = async () => {
    const result = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(result.data.message);
    setDogPicture(result.data.message);
  };

  useEffect(() => {
    onClickSync();
  }, []);

  return (
    <div>
      <Image src={dogPicture} alt="강아지 사진" />
    </div>
  );
}
