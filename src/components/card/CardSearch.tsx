import { baseAxios } from '@/apis/axiosInstance';
import { CardStore, useCardStore } from '@/stores/card/cardStore';
import React, { FormEvent, SetStateAction, useEffect, useState } from 'react';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import Loading from '../common/Loading';
import CardInput from '../input/CardInput';
import SearchTag from '../tag/SearchTag';
import { TagProps } from '../tag/Tag';
import style from './styles/card.module.css';

const CardSearch = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const setKeywordCardList = useCardStore(
    (state: CardStore) => state.setKeywordCardList,
  );
  const setTagCardList = useCardStore(
    (state: CardStore) => state.setTagCardList,
  );
  const setCardListType = useCardStore(
    (state: CardStore) => state.setCardListType,
  );

  const [tagList, setTagList] = useState<TagProps[]>([]);
  const [tagLoading, setIsTagLoading] = useState(false);
  const [selectTagList, setSelectTagList] = useState<string[]>([]);
  const [searchTagKeyword, setSearchTagKeyword] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => handleSearch(), 500);

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
      handleTagSearch();
    }, 500);

    return () => {
      setIsTagLoading(false);
      clearTimeout(timer);
    };
  }, [searchTagKeyword]);

  // const handleGetBestTags = async () => {
  //   setIsTagLoading(true);

  //   const url = `${BASE_URL}/tag/best`;

  //   try {
  //     const response = await baseAxios.get(url);

  //     setTagList(response.data);
  //   } catch (error: any) {
  //     console.error(error);
  //   } finally {
  //     setIsTagLoading(false);
  //   }
  // };

  const handleSearch = async (event?: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    if (event) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const keyword = formData.get('keyword');

      try {
        const query = `?keyword=${keyword}`;
        const url = `${BASE_URL}/card/search${query}`;
        const response = await baseAxios.get(url);

        setKeywordCardList(response.data);
        setCardListType('keyword');
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!selectTagList.length) {
        setCardListType('list');
        setIsLoading(false);
        return;
      }

      const query = `?keywords=${selectTagList.join('_')}`;
      const url = `${BASE_URL}/card/search/tag${query}`;

      try {
        const response = await baseAxios.get(url);

        setTagCardList(response.data);
        setCardListType('tag');
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTagSearch = async () => {
    try {
      const url = `${BASE_URL}/tag/keyword?keyword=${searchTagKeyword}`;
      const response = await baseAxios.get(url);

      setTagList(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsTagLoading(false);
    }
  };

  return (
    <form className={style.searchForm} onSubmit={handleSearch}>
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
