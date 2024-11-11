import { svgIcons } from "../common/functions/getSvg";
import style from "./styles/tag.module.css";

const Tag = ({ keyword, answered }: { keyword: string; answered: boolean }) => {
  return (
    <article className={`${style.tagWrap}${answered ? " " + style.answered : ""}`}>
      <span className={style.tagIcon}>{svgIcons.tag()}</span>
      <span className={style.tagKeyword}>{keyword}</span>
    </article>
  );
};

export default Tag;
