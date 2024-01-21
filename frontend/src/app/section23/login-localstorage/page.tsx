import { useRouter } from "next/router";
import React, { useState, type ChangeEvent } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/lib/recoil-provider";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginWithLocalStoragePage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginUser] = useMutation(LOGIN_USER);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
  };

  const onClickLogin = async (): Promise<void> => {
    try {
      const result = await loginUser({
        variables: [email, password],
      });

      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      if (accessToken === undefined) {
        alert(
          "일시적인 오류로 로그인에 실패하였습니다. 재 로그인하시기 바랍니다."
        );
        return;
      }

      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      //로그인 성공 페이지로 이동
      router.push("/section23/login-localstorage-success");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      비밀번호 : <input type="text" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인</button>
    </>
  );
}
