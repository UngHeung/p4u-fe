"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "../button/AuthButton";
import AuthInput from "../input/AuthInput";
import AuthIcons from "./AuthIcons";
import style from "./styles/sign.module.css";

const SignUp = () => {
  const [opacity, setOpacity] = useState("1");
  const [zIndex, setZIndex] = useState("2");
  const [disabled, setDisabled] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className={style.signUpForm}
    >
      <section className={style.inputNameWrap} style={{ opacity, zIndex }}>
        <div className={style.inputWrap}>
          <AuthInput
            id={"nameInput"}
            name={"name"}
            labelValue={"당신의 이름은?"}
            labelClass={style.inputLabel}
            className={style.input}
          />
        </div>

        <div className={style.buttonWrap}>
          <Link href={"/"}>이미 계정이 있어요!</Link>
          <AuthButton
            id={"nextButton"}
            value={{ text: "다음", icon: <AuthIcons size="small" type="enter" className={style.icon} /> }}
            className={`${style.button} ${style.submit}`}
            onClick={() => {
              setOpacity("0");
              setTimeout(() => {
                setZIndex("-99");
              }, 500);
            }}
          />
        </div>
      </section>

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
          <AuthButton
            id={"backButton"}
            value={{ text: "이전", icon: <AuthIcons size="small" type="cancel" className={style.icon} /> }}
            className={style.button}
            onClick={() => {
              setZIndex("2");
              setOpacity("1");
            }}
          />
          <AuthButton
            id={"submitButton"}
            type={"submit"}
            value={{ text: "가입", icon: <AuthIcons size="small" type="enter" className={style.icon} /> }}
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

export default SignUp;
