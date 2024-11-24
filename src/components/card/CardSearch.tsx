import { useCardTypeStore } from '@/stores/card/cardTypeStore';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { svgIcons } from '../common/functions/getSvg';
import CardInput from '../common/input/CardInput';
import Loading from '../common/Loading';
import SearchTag from '../tag/SearchTag';
import { TagProps } from '../tag/Tag';
import { handleTagSearch } from './handlers/handleSearchTag';
import style from './styles/card.module.css';

const CardSearch = ({
  setTagKeywords,
  setSearchKeyword,
  setTagSearchLoading,
}: {
  setTagKeywords: Dispatch<SetStateAction<string>>;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setTagSearchLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const setCardListType = useCardTypeStore(state => state.setCardListType);

  const [tagList, setTagList] = useState<TagProps[]>([]);
  const [tagLoading, setIsTagLoading] = useState(false);
  const [tagKeyword, setTagKeyword] = useState('');
  const [selectTagList, setSelectTagList] = useState<string[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsTagLoading(true);

    if (selectTagList.length > 0) {
      setSelectTagList([]);
    }

    const timer = setTimeout(async () => {
      handleTagSearch({ tagKeyword, setTagList, setIsTagLoading });
    }, 500);

    return () => {
      setIsTagLoading(false);
      clearTimeout(timer);
    };
  }, [tagKeyword]);

  useEffect(() => {
    setTagSearchLoading(true);
    if (selectTagList.length === 0) {
      setTagKeywords('');
      setCardListType('all');
      setTagSearchLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setTagKeywords(selectTagList.join('_'));
      setCardListType('tag');
      setTagSearchLoading(false);
    }, 700);

    return () => {
      setTagSearchLoading(false);
      clearTimeout(timer);
    };
  }, [selectTagList]);

  return (
    <form
      className={style.searchForm}
      onSubmit={async event => {
        event.preventDefault();

        queryClient.removeQueries({ queryKey: ['cards', 'all'] });

        if (tagKeyword.length > 0) {
          setSearchKeyword(tagKeyword);
          setCardListType('keyword');
        } else {
          setSearchKeyword('');
          setCardListType('all');
        }
      }}
    >
      <section className={style.searchInputWrap}>
        <CardInput
          name="keyword"
          className={style.searchInput}
          placeholder={'기도 제목, 태그로 검색할 수 있습니다.'}
          value={tagKeyword}
          setValue={setTagKeyword}
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
