import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import {
  ERROR_MESSAGE_ENUM,
  SUCCESS_MESSAGE_ENUM,
  VALIDATION_MESSAGE_ENUM,
} from '../alert/constants/message.enum';
import AuthIcons from '../auth/AuthIcons';
import MainButton from '../common/button/MainButton';
import { svgIcons } from '../common/functions/getSvg';
import CardInput from '../common/input/CardInput';
import CardTextarea from '../common/textarea/CardTextarea';
import Tag from '../tag/Tag';
import style from './styles/card.module.css';

const CardWrite = () => {
  const router = useRouter();

  const [isAnonymity, setIsAnonymity] = useState(false);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const handleDeleteTag = (idx: number) => {
    setTagList(tagList.filter((item, i) => (idx !== i ? item : null)));
  };

  const handleWriteCardOnMutation = useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      keywords: string[];
      isAnonymity: boolean;
    }) => {
      setDisabled(true);

      return authAxios.post(`/card/new`, data);
    },
    onSuccess: () => {
      pushAlertQueue(SUCCESS_MESSAGE_ENUM.SUCCESS_WRITE_CARD, 'success');
      router.push('/card/list');
    },
    onError: (error: any) => {
      if (error?.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHENTICATED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
    },
  });

  const handleWriteCard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDisabled(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      keywords: tagList,
      isAnonymity,
    };

    if (!data.title) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_CARD_TITLE, 'failure');
      setDisabled(false);
      return;
    }

    if (!data.content) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_CARD_CONTENT, 'failure');
      setDisabled(false);
      return;
    }

    if (!data.keywords.length) {
      pushAlertQueue(
        VALIDATION_MESSAGE_ENUM.WRONG_EMPTY_CARD_TAGS_LIST,
        'failure',
      );
      setDisabled(false);
      return;
    }

    handleWriteCardOnMutation.mutate(data);
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
              maxLength={500}
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
