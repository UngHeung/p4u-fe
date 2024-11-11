"use client";

import { AlertStore, useAlertStore } from "@/stores/alert/alertStore";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ALERT_MESSAGE_ENUM } from "../alert/constants/message.enum";
import MainButton from "../button/MainButton";
import AuthInput from "../input/AuthInput";
import AuthIcons from "./AuthIcons";
import style from "./styles/sign.module.css";

const SignIn = () => {
  const pushAlertQueue = useAlertStore((state: AlertStore) => state.pushAlertQueue);

  const [disabled, setDisabled] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      account: formData.get("account"),
      password: formData.get("password"),
    };

    if (!data.account) {
      pushAlertQueue(ALERT_MESSAGE_ENUM.EMPTY_ID);
      return;
    }

    if (!data.password) {
      pushAlertQueue(ALERT_MESSAGE_ENUM.EMPTY_PASSWORD);
      return;
    }
  };

  return (
    <form onSubmit={handleSignIn} className={style.signInForm}>
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
          <MainButton
            id={"submitButton"}
            type={"submit"}
            value={{ text: "로그인", icon: <AuthIcons size="small" type="enter" className={style.icon} /> }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </div>
      </section>
    </form>
  );
};

export default SignIn;
