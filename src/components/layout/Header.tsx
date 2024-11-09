"use client";

import AuthIcons from "../auth/AuthIcons";
import BaseButton from "../button/BaseButton";
import style from "./styles/layout.module.css";

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <section className={style.logoWrap}>
        <h2 className={style.logo}>P4U</h2>
      </section>

      <section className={style.buttonWrap}>
        <BaseButton
          id={""}
          type={"button"}
          className={""}
          value={{ icon: <AuthIcons type={"logout"} size={"small"} className={style.logout} /> }}
          onClick={() => {
            console.log("logout!");
          }}
        />
      </section>
    </header>
  );
};

export default Header;
