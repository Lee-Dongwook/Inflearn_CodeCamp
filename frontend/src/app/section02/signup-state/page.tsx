import { useState } from "react";

const validateEmail = (email: string): boolean => {
  if (email.includes("@") === true) {
    return true;
  }

  return false;
};

export default function SignUpStatePage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailStateMessage, setEmailStateMessage] = useState<string>("");

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event); // 나의 행동
    console.log(event.target); // 작동된 태그
    console.log(event.target.value); // 작동된 태그에 입력된 값

    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const onClickSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(email);
    console.log(password);

    if (validateEmail(email)) {
      setEmailStateMessage("이메일이 유효합니다.");
    } else {
      setEmailStateMessage("이메일이 유효하지 않습니다.");
    }
  };

  return (
    <div>
      이메일 : <input type="email" onChange={onChangeEmail} />
      <div>{emailStateMessage}</div>
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <button onClick={onClickSignUp}>회원가입</button>
    </div>
  );
}
