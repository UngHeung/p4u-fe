'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ALERT_MESSAGE_ENUM } from '../alert/constants/message.enum';
import MainButton from '../common/button/MainButton';
import { svgIcons } from '../common/functions/getSvg';
import AuthInput from '../common/input/AuthInput';
import AuthIcons from './AuthIcons';
import style from './styles/sign.module.css';

const SignUp = () => {
  const router = useRouter();
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [opacity, setOpacity] = useState('1');
  const [zIndex, setZIndex] = useState('2');
  const [disabled, setDisabled] = useState(false);
  const [passwordIsShow, setPasswordIsShow] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      account: formData.get('account'),
      password: formData.get('password'),
    };

    if (!data.name) {
      pushAlertQueue(ALERT_MESSAGE_ENUM.EMPTY_NAME, 'failure');
      setDisabled(false);
      return;
    }

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

    try {
      const response = await baseAxios.post(`/auth/signup`, data);

      if (response.status === 201) {
        pushAlertQueue(ALERT_MESSAGE_ENUM.SUCCESS_SIGN_UP, 'success');
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 409) {
        pushAlertQueue(ALERT_MESSAGE_ENUM.FAILURE_CONFLICT_ID, 'failure');
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className={style.signUpForm}>
      <section className={style.inputNameWrap} style={{ opacity, zIndex }}>
        <div className={style.inputWrap}>
          <AuthInput
            id={'nameInput'}
            name={'name'}
            labelValue={'당신의 이름은?'}
            labelClass={style.inputLabel}
            className={style.input}
          />
        </div>

        <div className={style.buttonWrap}>
          <Link href={'/'}>이미 계정이 있어요!</Link>
          <MainButton
            id={'nextButton'}
            value={{ text: '다음', icon: svgIcons.enter('medium') }}
            className={`${style.button} ${style.submit}`}
            onClick={() => {
              setOpacity('0');
              setTimeout(() => {
                setZIndex('-99');
              }, 500);
            }}
          />
        </div>
      </section>

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
            {passwordIsShow ? (
              <AuthIcons type="pwIsNotShow" size="small" />
            ) : (
              <AuthIcons type="pwIsShow" size="small" />
            )}
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
          <MainButton
            id={'backButton'}
            value={{ text: '이전', icon: svgIcons.back() }}
            className={style.button}
            onClick={() => {
              setZIndex('2');
              setOpacity('1');
            }}
          />
          <MainButton
            id={'submitButton'}
            type={'submit'}
            value={{ text: '가입', icon: svgIcons.enter('medium') }}
            className={`${style.button} ${style.submit}`}
            disabled={disabled}
          />
        </div>
      </section>
    </form>
  );
};

export default SignUp;
