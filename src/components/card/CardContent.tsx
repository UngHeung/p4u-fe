import { UserProps } from '@/stores/user/userStore';
import Tag, { TagProps } from '../tag/Tag';
import style from './styles/card.module.css';

const CardContent = ({
  title,
  writer,
  tags,
  isAnonymity,
  answered,
}: {
  title: string;
  writer: Pick<UserProps, 'id' | 'name'>;
  tags: TagProps[];
  isAnonymity: boolean;
  answered: boolean;
}) => {
  return (
    <>
      <strong className={style.cardTitle}>{title}</strong>
      <span className={style.cardWriter}>
        {isAnonymity ? '익명' : writer.name}
      </span>
      <section className={style.cardTagWrap}>
        <ul className={style.cardTagList}>
          {tags &&
            tags.length > 0 &&
            tags.map((tag, idx) => {
              return (
                <li key={idx}>
                  <Tag keyword={tag.keyword} answered={answered} />
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default CardContent;
