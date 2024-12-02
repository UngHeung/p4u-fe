'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import useAlert from '../common/alert/useAlert';
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
  const { pushAlert } = useAlert();

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
      pushAlert({
        target: 'ID',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
      setDisabled(false);
      return;
    }

    if (!data.password) {
      pushAlert({
        target: 'PASSWORD',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
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

      pushAlert({ target: 'LOGIN', type: 'SUCCESS' });

      router.replace('/card/list');
    } catch (error: any) {
      pushAlert({
        target: 'ID_OR_PASSWORD',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 404 ? 'NOT_FOUND_USER' : 'ID_OR_PASSWORD',
      });
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
