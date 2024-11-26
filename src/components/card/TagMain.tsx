import { Dispatch, SetStateAction } from 'react';
import { VALIDATION_MESSAGE_ENUM } from '../alert/constants/message.enum';
import { svgIcons } from '../common/functions/getSvg';
import style from './styles/card.module.css';
import TagList from './TagList';

const TagMain = ({
  tag,
  setTag,
  tagList,
  setTagList,
  pushAlertQueue,
}: {
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
  pushAlertQueue: (message: string, type: 'success' | 'failure') => void;
}) => {
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
          placeholder={'#태그를 추가해주세요. (최대 5개)'}
          maxLength={8}
          value={tag}
          onChange={event => setTag(event.target.value)}
        />

        <button
          type={'submit'}
          className={style.tagIcon}
          onClick={event => {
            event.preventDefault();
            setTag('');
            if (tagList.includes(tag)) {
              pushAlertQueue(
                VALIDATION_MESSAGE_ENUM.WRONG_IS_ALEADY_TAG,
                'failure',
              );
            } else if (tagList.length === 5) {
              pushAlertQueue(
                VALIDATION_MESSAGE_ENUM.WRONG_FULL_CARD_TAGS_LIST,
                'failure',
              );
            } else if (tag.length < 2) {
              pushAlertQueue(
                VALIDATION_MESSAGE_ENUM.WRONG_TAG_KEYWORD,
                'failure',
              );
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
