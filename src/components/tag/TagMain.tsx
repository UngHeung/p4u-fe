import { Dispatch, SetStateAction } from 'react';
import style from '../card/styles/card.module.css';
import useAlert from '../common/alert/useAlert';
import { svgIcons } from '../common/functions/getSvg';
import TagList from './TagList';

const TagMain = ({
  tag,
  setTag,
  tagList,
  setTagList,
}: {
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
}) => {
  const { pushAlert } = useAlert();
  const handleDeleteTag = (idx: number) => {
    setTagList(tagList.filter((item, i) => (idx !== i ? item : null)));
  };

  return (
    <>
      <TagList tagList={tagList} handleDeleteTag={handleDeleteTag} />
      <section className={style.inputTagWrap}>
        <input
          type={'text'}
          name={'tag'}
          id={'tag'}
          placeholder={'#태그를 추가해주세요. (한글/영문, 최대 5개)'}
          maxLength={8}
          value={tag}
          onChange={event => {
            setTag(event.target.value.replace(/[~₩!@#$%^&*()_+-=/?]/g, ''));
          }}
        />

        <button
          type={'submit'}
          className={style.tagIcon}
          onClick={event => {
            event.preventDefault();
            setTag('');
            if (tagList.includes(tag)) {
              pushAlert({
                target: 'TAG',
                type: 'FAILURE',
                status: 400,
                reason: 'DUPLICATE',
              });
            } else if (tagList.length === 5) {
              pushAlert({
                target: 'TAG',
                type: 'FAILURE',
                status: 400,
                reason: 'TAG_COUNT',
              });
            } else if (tag.length < 2 || tag.length > 8) {
              pushAlert({
                target: 'TAG',
                type: 'FAILURE',
                status: 400,
                reason: 'TAG_LENGTH',
              });
            } else {
              setTagList(prev => [...prev, tag]);
            }
          }}
        >
          {svgIcons.enter('medium', '#222222')}
        </button>
      </section>
    </>
  );
};

export default TagMain;
