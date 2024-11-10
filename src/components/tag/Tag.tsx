import Image from "next/image";
import icons from "../../assets/icon.png";
import style from "./styles/tag.module.css";

const Tag = ({ keyword }: { keyword: string }) => {
  return (
    <article className={style.tagWrap}>
      <span className={style.tagIcon}>
        <Image src={icons} alt={"태그_아이콘"} width={120} height={100} />
      </span>
      <span className={style.tagKeyword}>{keyword}</span>
    </article>
  );
};

export default Tag;
