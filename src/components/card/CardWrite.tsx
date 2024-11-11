import { useState } from "react";
import AuthIcons from "../auth/AuthIcons";
import MainButton from "../button/MainButton";
import { svgIcons } from "../common/functions/getSvg";
import Tag from "../tag/Tag";
import style from "./styles/card.module.css";

const CardWrite = () => {
  const [isAnonymity, setIsAnonymity] = useState(true);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleDeleteTag = (idx: number) => {
    setTagList(tagList.filter((item, i) => (idx !== i ? item : null)));
  };

  return (
    <>
      <form className={style.cardWriteForm}>
        <div className={style.cardWriteWrap}>
          <section className={style.checkAnonymityWrap}>
            <span className={style.anonymityOrName}>{isAnonymity ? "익명" : "실명"}</span>
            <label htmlFor="anonymity" className={style.checkAnonymityBg}>
              <span className={`${style.checkAnonymityStick}${isAnonymity ? " " + style.isAnonymity : ""}`}> </span>
            </label>
            <input type="checkbox" name="anonymity" id={"anonymity"} onChange={() => setIsAnonymity((prev) => !prev)} />
          </section>

          <section className={style.writeTitleWrap}>
            <input name={"title"} type={"text"} placeholder={"하나의 카드에 하나의 기도제목!"} />
          </section>

          <section className={style.writeContentWrap}>
            <textarea name={"content"} placeholder={"내용을 작성해주세요."}></textarea>
          </section>
        </div>
        <div className={style.tagWrap}>
          <section className={style.addTagWrap}>
            <ul>
              {tagList.map((item, idx) => {
                return (
                  <li key={idx} onClick={() => handleDeleteTag(idx)}>
                    <Tag keyword={item} answered={false} />
                  </li>
                );
              })}
            </ul>
          </section>
          <section className={style.inputTagWrap}>
            <input
              type={"text"}
              name={"tag"}
              id={"tag"}
              placeholder={"#태그를 추가해주세요. (최대 5개)"}
              maxLength={8}
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
            <button
              type={"button"}
              className={style.tagIcon}
              onClick={() => {
                setTag("");
                setTagList((prev) => [...prev, tag]);
              }}
            >
              {svgIcons.enter("medium", "#222222")}
            </button>
          </section>
        </div>
        <section className={style.buttonWrap}>
          <MainButton
            id={"submitButton"}
            type={"submit"}
            value={{ text: "저장", icon: <AuthIcons size="small" type="enter" className={style.icon} /> }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </section>
      </form>
    </>
  );
};

export default CardWrite;
