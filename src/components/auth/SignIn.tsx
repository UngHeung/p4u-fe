'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import {
  ERROR_MESSAGE_ENUM,
  SUCCESS_MESSAGE_ENUM,
  VALIDATION_MESSAGE_ENUM,
} from '../alert/constants/message.enum';
import MainButton from '../common/button/MainButton';
import { setToken } from '../common/constants/accessToken';
import { svgIcons } from '../common/functions/getSvg';
import AuthInput from '../common/input/AuthInput';
import {
  generateBasicToken,
  getUserByPayload,
} from './handlers/handleTokenAndDatasFromPayload';
import style from './styles/sign.module.css';

const SignIn = () => {
  const router = useRouter();

  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const setIsLoggedIn = useUserStore((state: UserStore) => state.setIsLoggedIn);

  const [disabled, setDisabled] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      account: formData.get('account') as string,
      password: formData.get('password') as string,
    };

    if (!data.account) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_ID, 'failure');
      setDisabled(false);
      return;
    }

    if (!data.password) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_PASSWORD, 'failure');
      setDisabled(false);
      return;
    }

    const basicToken = generateBasicToken(data.account, data.password);

    try {
      const response = await baseAxios.post(`/auth/signin`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: basicToken,
        },
      });

      const { accessToken, refreshToken } = response.data;

      setToken({ accessToken, refreshToken });

      const user = getUserByPayload(accessToken);

      setUser(user);
      setIsLoggedIn(true);

      pushAlertQueue(SUCCESS_MESSAGE_ENUM.SUCCESS_SIGN_IN, 'success');

      router.replace('/card/list');
    } catch (error: any) {
      console.error(error);
      if (error.status === 404 || error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHORIZED_EXCEPTION, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className={style.signInForm}>
      <section className={style.inputIdWrap}>
        <div className={style.inputWrap}>
          <AuthInput
            id={'account'}
            name={'account'}
            labelValue={'아이디를 입력해주세요.'}
            labelClass={style.inputLabel}
            className={style.input}
          />

          <span
            className={style.togglePasswordIsShow}
            onClick={() => setPasswordIsShow(prev => !prev)}
          >
            {passwordIsShow ? svgIcons.visible(false) : svgIcons.visible(true)}
          </span>
          <AuthInput
            id={'password'}
            name={'password'}
            type={passwordIsShow ? 'text' : 'password'}
            labelValue={'비밀번호를 입력해주세요.'}
            labelClass={style.inputLabel}
            className={style.input}
          />
        </div>

        <div className={style.buttonWrap}>
          <Link href={'/signup'}>가입 하러가기!</Link>
          <MainButton
            id={'submitButton'}
            type={'submit'}
            value={{ text: '로그인', icon: svgIcons.enter('medium') }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </div>

        <div className={style.forgotPasswordLink}>
          <Link href={'/forgot'}>비밀번호를 잊으셨나요?</Link>
        </div>
      </section>
    </form>
  );
};

export default SignIn;
