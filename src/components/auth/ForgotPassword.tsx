'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  ERROR_MESSAGE_ENUM,
  NOTIFICATION_MESSAGE_ENUM,
  SUCCESS_MESSAGE_ENUM,
  VALIDATION_MESSAGE_ENUM,
} from '../alert/constants/message.enum';
import MainButton from '../common/button/MainButton';
import { svgIcons } from '../common/functions/getSvg';
import AuthInput from '../common/input/AuthInput';
import style from './styles/sign.module.css';

const ForgotPassword = () => {
  const router = useRouter();
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [disabled, setDisabled] = useState(false);
  const [recievedResetCode, setRecievedResetCode] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      account: formData.get('account') as string,
      email: formData.get('email') as string,
    };

    const newData = {
      ...data,
      resetCode: '',
      newPassword: '',
    };

    if (!data.account) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_ID, 'failure');
      setDisabled(false);
      return;
    }

    if (!data.email) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_EMAIL, 'failure');
      setDisabled(false);
      return;
    }

    if (recievedResetCode) {
      newData.resetCode = formData.get('resetCode') as string;
      newData.newPassword = formData.get('newPassword') as string;

      if (!newData.resetCode) {
        pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_RESET_CODE, 'failure');
        setDisabled(false);
        return;
      }

      if (!newData.newPassword) {
        pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_PASSWORD, 'failure');
        setDisabled(false);
        return;
      }
    }

    try {
      const url = recievedResetCode
        ? `/auth/password-reset/verify`
        : `/auth/password-reset/request`;

      const response = await baseAxios.post(
        url,
        recievedResetCode ? newData : data,
      );

      if (response.status === 200 || response.status === 201) {
        if (recievedResetCode) {
          pushAlertQueue(
            SUCCESS_MESSAGE_ENUM.SUCCESS_RESET_PASSWORD,
            'success',
          );
          router.push('/');
        } else {
          pushAlertQueue(
            NOTIFICATION_MESSAGE_ENUM.NOTIFICATION_SEND_EMAIL_FORGOT_PASSWORD,
            'notification',
          );
          setRecievedResetCode(true);
        }
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.NOT_FOUND_USER, 'failure');
      } else if (error.response.status === 401) {
        if (recievedResetCode) {
          pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHORIZED_RESET_CODE, 'failure');
        } else {
          pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHORIZED_EMAIL, 'failure');
        }
      } else if (error.response.status === 403) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHORIZED_RESET_CODE, 'failure');
      } else if (error.response.status === 400) {
        pushAlertQueue('아이디 또는 이메일을 확인해주세요.', 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form className={style.signInForm} onSubmit={handleSubmit}>
      <section className={style.inputIdWrap}>
        <div className={style.inputWrap}>
          <AuthInput
            id={'inputId'}
            name={'account'}
            type={'text'}
            labelValue={'아이디를 입력해주세요.'}
            labelClass={style.inputLabel}
            className={style.input}
            readOnly={recievedResetCode}
          />

          <AuthInput
            id={'inputEmail'}
            name={'email'}
            type={'text'}
            labelValue={'이메일을 입력해주세요.'}
            labelClass={style.inputLabel}
            className={style.input}
            readOnly={recievedResetCode}
          />

          {recievedResetCode && (
            <>
              <AuthInput
                id={'inputResetCode'}
                name={'resetCode'}
                type={'text'}
                maxLength={6}
                labelValue={'재설정 코드를 입력해주세요.'}
                labelClass={style.inputLabel}
                className={style.input}
              />

              <span
                className={style.togglePasswordIsShow}
                onClick={() => setPasswordIsShow(prev => !prev)}
              >
                {passwordIsShow
                  ? svgIcons.visible(false)
                  : svgIcons.visible(true)}
              </span>
              <AuthInput
                id={'inputPassword'}
                name={'newPassword'}
                type={passwordIsShow ? 'text' : 'password'}
                labelValue={'새로운 비밀번호를 입력해주세요.'}
                labelClass={style.inputLabel}
                className={style.input}
              />
            </>
          )}
        </div>

        <div className={style.buttonWrap}>
          <Link href={'/'}>로그인 하러가기!</Link>
          <MainButton
            id={'submitButton'}
            type={'submit'}
            value={{
              text: `${recievedResetCode ? '재설정' : '찾기'}`,
              icon: svgIcons.enter('medium'),
            }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </div>
      </section>
    </form>
  );
};

export default ForgotPassword;
