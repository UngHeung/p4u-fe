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
import MainButton from '../common/button/MainButton';
import { svgIcons } from '../common/functions/getSvg';
import CardInput from '../common/input/CardInput';
import CardTextarea from '../common/textarea/CardTextarea';
import style from './styles/card.module.css';
import TagMain from './TagMain';
import useAlert from '../common/alert/useAlert';

const CardWrite = () => {
  const router = useRouter();
  const { pushAlert } = useAlert();

  const [isAnonymity, setIsAnonymity] = useState(false);
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

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
      pushAlert({
        target: 'CARD_WRITE',
        type: 'SUCCESS',
        status: 200,
      });
      router.push('/card/list');
    },
    onError: (error: any) => {
      if (error?.status === 401) {
        pushAlert({
          target: 'CARD_WRITE',
          type: 'FAILURE',
          status: 401,
        });
      } else {
        pushAlert({
          target: 'CARD_WRITE',
          type: 'FAILURE',
          status: 500,
        });
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
      pushAlert({
        target: 'TITLE',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
      setDisabled(false);
      return;
    }

    if (!data.content) {
      pushAlert({
        target: 'CONTENT',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
      setDisabled(false);
      return;
    }

    if (!data.keywords.length) {
      pushAlert({
        target: 'TAG',
        type: 'FAILURE',
        status: 400,
        reason: 'TAG_COUNT',
      });
      setDisabled(false);
      return;
    }

    handleWriteCardOnMutation.mutate(data);
  };

  return (
    <section>
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
          <TagMain
            tag={tag}
            setTag={setTag}
            tagList={tagList}
            setTagList={setTagList}
          />
        </div>
        <section className={style.buttonWrap}>
          <MainButton
            id={'submitButton'}
            type={'submit'}
            value={{
              text: '저장',
              icon: svgIcons.enter('medium'),
            }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </section>
      </form>
    </section>
  );
};

export default CardWrite;
