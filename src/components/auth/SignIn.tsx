"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "../button/AuthButton";
import AuthInput from "../input/AuthInput";
import AuthIcons from "./AuthIcons";
import style from "./styles/sign.module.css";

const SignIn = () => {
  const [disabled, setDisabled] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className={style.signInForm}
    >
      <section className={style.inputIdWrap}>
        <div className={style.inputWrap}>
          <AuthInput
            id={"account"}
            name={"account"}
            labelValue={"아이디를 입력해주세요."}
            labelClass={style.inputLabel}
            className={style.input}
          />

          <span className={style.togglePasswordIsShow} onClick={() => setPasswordIsShow((prev) => !prev)}>
            {passwordIsShow ? (
              <AuthIcons type="pwIsNotShow" size="small" />
            ) : (
              <AuthIcons type="pwIsShow" size="small" />
            )}
          </span>
          <AuthInput
            id={"password"}
            name={"password"}
            type={passwordIsShow ? "text" : "password"}
            labelValue={"비밀번호를 입력해주세요."}
            labelClass={style.inputLabel}
            className={style.input}
          />
        </div>

        <div className={style.buttonWrap}>
          <Link href={"/signup"}>가입 하러가기!</Link>
          <AuthButton
            id={"submitButton"}
            type={"submit"}
            value={{ text: "로그인", icon: <AuthIcons size="small" type="enter" className={style.icon} /> }}
            className={`${style.button} ${style.submit}`}
            onClick={() => {
              setDisabled(true);

              setTimeout(() => {
                console.log("login!");
                setDisabled(false);
              }, 1000);
            }}
            disabled={disabled}
          />
        </div>
      </section>
    </form>
  );
};

export default SignIn;
