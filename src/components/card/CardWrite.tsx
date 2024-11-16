import { authAxios } from '@/apis/axiosInstance';
import { FormEvent, useState } from 'react';
import AuthIcons from '../auth/AuthIcons';
import MainButton from '../button/MainButton';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import CardTextarea from '../common/textarea/CardTextarea';
import CardInput from '../input/CardInput';
import Tag from '../tag/Tag';
import style from './styles/card.module.css';

const CardWrite = () => {
  const [isAnonymity, setIsAnonymity] = useState(false);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleDeleteTag = (idx: number) => {
    setTagList(tagList.filter((item, i) => (idx !== i ? item : null)));
  };

  const handleWriteCard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDisabled(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      keywords: tagList,
      isAnonymity,
    };

    console.log(data);

    try {
      const response = await authAxios.post(`${BASE_URL}/card/new`, data);

      console.log(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <form className={style.cardWriteForm} onSubmit={handleWriteCard}>
        <div className={style.cardWriteWrap}>
          <section className={style.checkAnonymityWrap}>
            <span className={style.anonymityOrName}>
              {isAnonymity ? '익명' : '실명'}
            </span>
            <label htmlFor={'anonymity'} className={style.checkAnonymityBg}>
              <span
                className={`${style.checkAnonymityStick}${isAnonymity ? ' ' + style.isAnonymity : ''}`}
              >
                {' '}
              </span>
            </label>
            <input
              type={'checkbox'}
              name={'anonymity'}
              id={'anonymity'}
              onChange={() => setIsAnonymity(prev => !prev)}
            />
          </section>

          <section className={style.writeTitleWrap}>
            <CardInput
              name={'title'}
              placeholder={'하나의 카드에 하나의 기도제목!'}
            />
          </section>

          <section className={style.writeContentWrap}>
            <CardTextarea
              name={'content'}
              placeholder={'내용을 작성해주세요.'}
            />
          </section>
        </div>
        <div className={style.tagWrap}>
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
                setTagList(prev => [...prev, tag]);
              }}
            >
              {svgIcons.enter('medium', '#222222')}
            </button>
          </section>
        </div>
        <section className={style.buttonWrap}>
          <MainButton
            id={'submitButton'}
            type={'submit'}
            value={{
              text: '저장',
              icon: (
                <AuthIcons size="small" type="enter" className={style.icon} />
              ),
            }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </section>
      </form>
    </>
  );
};

export default CardWrite;
