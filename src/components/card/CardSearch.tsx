import { CardStore, useCardStore } from '@/stores/card/cardStore';
import React, { SetStateAction, useEffect, useState } from 'react';
import { svgIcons } from '../common/functions/getSvg';
import CardInput from '../common/input/CardInput';
import Loading from '../common/Loading';
import SearchTag from '../tag/SearchTag';
import { TagProps } from '../tag/Tag';
import { handleSearch } from './handlers/handleSearch';
import { handleTagSearch } from './handlers/handleSearchTag';
import style from './styles/card.module.css';

const CardSearch = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const setCardList = useCardStore((state: CardStore) => state.setCardList);
  const setCardListType = useCardStore(
    (state: CardStore) => state.setCardListType,
  );

  const [tagList, setTagList] = useState<TagProps[]>([]);
  const [tagLoading, setIsTagLoading] = useState(false);
  const [selectTagList, setSelectTagList] = useState<string[]>([]);
  const [searchTagKeyword, setSearchTagKeyword] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(
      () =>
        handleSearch({
          setIsLoading,
          setCardListType,
          setCardList,
          selectTagList,
        }),
      500,
    );

    return () => {
      setIsLoading(false);
      clearTimeout(timer);
    };
  }, [selectTagList]);

  useEffect(() => {
    setIsTagLoading(true);

    if (selectTagList.length > 0) {
      setSelectTagList([]);
    }

    const timer = setTimeout(async () => {
      handleTagSearch({ searchTagKeyword, setTagList, setIsTagLoading });
    }, 500);

    return () => {
      setIsTagLoading(false);
      clearTimeout(timer);
    };
  }, [searchTagKeyword]);

  return (
    <form
      className={style.searchForm}
      onSubmit={event =>
        handleSearch(
          {
            setIsLoading,
            setCardListType,
            setCardList,
            selectTagList,
          },
          event,
        )
      }
    >
      <section className={style.searchInputWrap}>
        <CardInput
          name="keyword"
          className={style.searchInput}
          placeholder={'기도 제목, 태그로 검색할 수 있습니다.'}
          value={searchTagKeyword}
          setValue={setSearchTagKeyword}
        />
        <button type={'submit'} className={style.searchButton}>
          <>{svgIcons.search()}</>
        </button>
      </section>
      <section className={style.searchTagsWrap}>
        <ul className={style.searchTags}>
          {!tagLoading ? (
            tagList ? (
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
              <li key={'empty'}>아직 태그가 없습니다.</li>
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
