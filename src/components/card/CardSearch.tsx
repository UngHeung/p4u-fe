import { CardListType } from '@/stores/card/cardTypeStore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { svgIcons } from '../common/functions/getSvg';
import CardInput from '../common/input/CardInput';
import Loading from '../common/Loading';
import SearchTag from '../tag/SearchTag';
import { TagProps } from '../tag/Tag';
import { handleTagSearch } from './handlers/handleSearchTag';
import style from './styles/card.module.css';

const CardSearch = ({
  keyword,
  setKeyword,
  setSearchKeyword,
  setActiveTab,
}: {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setActiveTab: (type: CardListType) => void;
}) => {
  const [tagList, setTagList] = useState<TagProps[]>([]);
  const [tagLoading, setIsTagLoading] = useState(false);
  const [selectTagList, setSelectTagList] = useState<string[]>([]);

  useEffect(() => {
    setIsTagLoading(true);

    if (selectTagList.length > 0) {
      setSelectTagList([]);
    }

    const timer = setTimeout(async () => {
      handleTagSearch({ keyword, setTagList, setIsTagLoading });
    }, 500);

    return () => {
      setIsTagLoading(false);
      clearTimeout(timer);
    };
  }, [keyword]);

  return (
    <form
      className={style.searchForm}
      onSubmit={async event => {
        event.preventDefault();

        setSearchKeyword(keyword);
        setActiveTab('keyword');
      }}
    >
      <section className={style.searchInputWrap}>
        <CardInput
          name="keyword"
          className={style.searchInput}
          placeholder={'기도 제목, 태그로 검색할 수 있습니다.'}
          value={keyword}
          setValue={setKeyword}
        />
        <button type={'submit'} className={style.searchButton}>
          <>{svgIcons.search()}</>
        </button>
      </section>
      <section className={style.searchTagsWrap}>
        <ul className={style.searchTags}>
          {!tagLoading ? (
            tagList.length > 0 ? (
              tagList.map((tag, idx) => {
                return (
                  <li key={idx}>
                    <SearchTag
                      keyword={tag.keyword}
                      index={idx}
                      setSelectTagList={setSelectTagList}
                    />
                  </li>
                );
              })
            ) : (
              <li key={'empty'}>검색된 태그가 없습니다.</li>
            )
          ) : (
            <li key={'loadkey'} className={style.loading}>
              <Loading color={'#222222'} />
            </li>
          )}
        </ul>
      </section>
    </form>
  );
};

export default CardSearch;
