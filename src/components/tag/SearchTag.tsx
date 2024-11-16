import React, { useState } from 'react';
import Tag from './Tag';
import style from './styles/tag.module.css';

const SearchTag = ({
  keyword,
  index,
  setSelectTagList,
}: {
  keyword: string;
  index: number;
  setSelectTagList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <article className={style.searchTagWrap}>
      <label htmlFor={`tag_${index}`}>
        <Tag keyword={keyword} checked={checked} />
      </label>
      <input
        type="checkbox"
        name="selectTag"
        id={`tag_${index}`}
        onChange={() => {
          setChecked(prev => !prev);

          if (checked) {
            setSelectTagList(prev => prev.filter(item => item !== keyword));
          } else {
            setSelectTagList(prev => [...prev, keyword]);
          }
        }}
        checked={checked}
      />
    </article>
  );
};

export default SearchTag;
