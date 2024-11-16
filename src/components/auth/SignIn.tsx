'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ALERT_MESSAGE_ENUM } from '../alert/constants/message.enum';
import MainButton from '../button/MainButton';
import { setToken } from '../common/constants/accessToken';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import AuthInput from '../input/AuthInput';
import style from './styles/sign.module.css';

const SignIn = () => {
  const router = useRouter();

  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );
  const setUser = useUserStore((state: UserStore) => state.setUser);

  const [disabled, setDisabled] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      account: formData.get('account'),
      password: formData.get('password'),
    };

    if (!data.account) {
      pushAlertQueue(ALERT_MESSAGE_ENUM.EMPTY_ID, 'failure');
      setDisabled(false);
      return;
    }

    if (!data.password) {
      pushAlertQueue(ALERT_MESSAGE_ENUM.EMPTY_PASSWORD, 'failure');
      setDisabled(false);
      return;
    }

    const prefix = 'Basic';
    const base64String = Buffer.from(
      `${data.account}:${data.password}`,
    ).toString('base64');
    const basicToken = `${prefix} ${base64String}`;

    try {
      const response = await baseAxios.post(`${BASE_URL}/auth/signin`, data, {
        headers: {
          Authorization: basicToken,
        },
      });

      const { accessToken, refreshToken } = response.data;

      setToken({ accessToken, refreshToken });

      const payload = accessToken.split('.')[1];
      const buffer = Buffer.from(payload, 'base64');
      const dataString = buffer.toString().replaceAll(/['"]/g, '');
      const dataParts = dataString.split(',');

      const user = {
        id: +dataParts[0].split(':')[1],
        name: dataParts[1].split(':')[1],
        account: dataParts[2].split(':')[1],
      };

      setUser(user);

      pushAlertQueue(ALERT_MESSAGE_ENUM.SUCCESS_SIGN_IN, 'success');

      router.replace('/card/list');
    } catch (error: any) {
      console.error(error);
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
      </section>
    </form>
  );
};

export default SignIn;
