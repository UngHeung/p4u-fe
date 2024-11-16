import { svgIcons } from '../common/functions/getSvg';
import style from './styles/tag.module.css';

export interface TagProps {
  keyword: string;
}

const Tag = ({
  keyword,
  answered,
  checked,
}: {
  keyword: string;
  answered?: boolean;
  checked?: boolean;
}) => {
  return (
    <article
      className={`${style.tagWrap}${answered ? ' ' + style.answered : checked ? ' ' + style.checked : ''}`}
    >
      <span className={style.tagIcon}>{svgIcons.tag()}</span>
      <span className={style.tagKeyword}>{keyword}</span>
    </article>
  );
};

export default Tag;
