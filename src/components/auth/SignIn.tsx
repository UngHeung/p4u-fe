'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import useAlert from '../common/alert/useAlert';
import Button from '../common/button/Button';
import { setToken } from '../common/constants/accessToken';
import { svgIcons } from '../common/functions/getSvg';
import TextInput from '../common/input/TextInput';
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
          <TextInput
            inputProps={{
              id: 'loginInputAccount',
              name: 'account',
              className: style.input,
            }}
            labelProps={{
              htmlFor: 'loginInputAccount',
              value: '아이디를 입력해주세요',
            }}
          />

          <span
            className={style.togglePasswordIsShow}
            onClick={() => setPasswordIsShow(prev => !prev)}
          >
            {passwordIsShow ? svgIcons.visible(false) : svgIcons.visible(true)}
          </span>
          <TextInput
            inputProps={{
              id: 'loginInputPassword',
              name: 'password',
              className: style.input,
              type: passwordIsShow ? 'text' : 'password',
            }}
            labelProps={{
              htmlFor: 'loginInputPassword',
              value: '비밀번호를 입력해주세요',
            }}
          />
        </div>

        <div className={style.buttonWrap}>
          <Link href={'/signup'}>가입 하러가기!</Link>
          <Button
            props={{
              id: 'submitButton',
              type: 'submit',
              value: '로그인',
              className: `${style.button} ${style.submit}`,
              disabled: disabled,
            }}
            icon={svgIcons.enter('medium')}
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
