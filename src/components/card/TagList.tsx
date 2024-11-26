import Tag from '../tag/Tag';
import style from './styles/card.module.css';

const TagList = ({
  tagList,
  handleDeleteTag,
}: {
  tagList: string[];
  handleDeleteTag: (idx: number) => void;
}) => {
  return (
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
  );
};

export default TagList;
