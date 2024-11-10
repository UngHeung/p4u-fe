"use client";

import icons from "@/public/icons/icon.png";
import Image from "next/image";
import { ALERT_MESSAGE_ENUM, AlertMessageEnumTypes } from "./constants/message.enum";
import style from "./styles/alert.module.css";

export interface AlertItemProps {
  message: AlertMessageEnumTypes;
}

const Alert = () => {
  const messageEnum = ALERT_MESSAGE_ENUM;
  // expired, isShow,

  return (
    <article className={style.alertWrap}>
      <span
        className={style.alertIcon}
        onClick={() => {
          console.log("alert close!");
        }}
      >
        <Image src={icons} alt={"태그_아이콘"} width={120} height={100} sizes="100%" />
      </span>
      <pre className={style.alertMessage}>{"이름은 한글, 영문 대소문자만\n입력이 가능합니다."}</pre>
    </article>
  );
};

export default Alert;
