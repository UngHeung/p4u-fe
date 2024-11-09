"use client";

import { useState } from "react";
import AuthButton from "../button/AuthButton";
import AuthInput from "../input/AuthInput";
import AuthIcons from "./AuthIcons";
import style from "./styles/sign.module.css";

const SignUp = () => {
  const [inputNameWrapLeft, setInputNameWrapLeft] = useState("50%");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className={style.signUpForm}
    >
      <section className={style.inputNameWrap} style={{ left: inputNameWrapLeft }}>
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
          <AuthButton
            id={"nextButton"}
            value={"다음"}
            className={`${style.button} ${style.submit}`}
            onClick={() => setInputNameWrapLeft("-150%")}
          />
          <AuthIcons size="small" type="enter" className={style.icon} />
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
          <AuthInput
            id={"password"}
            name={"password"}
            type={"password"}
            labelValue={"비밀번호를 입력해주세요."}
            labelClass={style.inputLabel}
            className={style.input}
          />
        </div>

        <div className={style.buttonWrap}>
          <AuthButton
            id={"backButton"}
            value={"이전"}
            className={style.button}
            onClick={() => setInputNameWrapLeft("50%")}
          />
          <AuthIcons size="small" type="cancel" className={style.icon} />
          <AuthButton
            id={"submitButton"}
            type={"submit"}
            value={"가입"}
            className={`${style.button} ${style.submit}`}
            onClick={() => {}}
          />
          <AuthIcons size="small" type="enter" className={style.icon} />
        </div>
      </section>
    </form>
  );
};

export default SignUp;
