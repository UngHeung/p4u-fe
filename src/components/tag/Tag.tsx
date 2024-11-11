import icons from "@/public/icons/icon.png";
import Image from "next/image";
import style from "./styles/tag.module.css";

const Tag = ({ keyword, answered }: { keyword: string; answered: boolean }) => {
  return (
    <article className={`${style.tagWrap}${answered ? " " + style.answered : ""}`}>
      <span className={style.tagIcon}>
        <Image src={icons} alt={"태그_아이콘"} width={120} height={100} />
      </span>
      <span className={style.tagKeyword}>{keyword}</span>
    </article>
  );
};

export default Tag;
