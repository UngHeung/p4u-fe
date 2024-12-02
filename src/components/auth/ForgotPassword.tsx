'use client';

import { baseAxios } from '@/apis/axiosInstance';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAlert from '../common/alert/useAlert';
import MainButton from '../common/button/MainButton';
import { svgIcons } from '../common/functions/getSvg';
import AuthInput from '../common/input/AuthInput';
import style from './styles/sign.module.css';

const ForgotPassword = () => {
  const router = useRouter();
  const { pushAlert } = useAlert();

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

    if (!data.account || !data.email) {
      pushAlert({
        target: !data.account ? 'ID' : 'EMAIL',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
      setDisabled(false);
      return;
    }

    if (recievedResetCode) {
      newData.resetCode = formData.get('resetCode') as string;
      newData.newPassword = formData.get('newPassword') as string;

      if (!newData.resetCode) {
        pushAlert({
          target: 'RESET_CODE',
          type: 'FAILURE',
          status: 400,
          reason: 'NOT_FOUND',
        });
        setDisabled(false);
        return;
      }

      if (!newData.newPassword) {
        pushAlert({
          target: 'RESET_PASSWORD',
          type: 'FAILURE',
          status: 400,
          reason: 'NOT_FOUND',
        });
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
          pushAlert({
            target: 'RESET_PASSWORD',
            type: 'SUCCESS',
            status: response.status,
          });

          router.push('/');
        } else {
          pushAlert({
            target: 'EMAIL',
            type: 'SUCCESS',
            status: response.status,
          });

          setRecievedResetCode(true);
        }
      }
    } catch (error: any) {
      const errMessage = error.response.data.message + '';
      const target = errMessage.startsWith('인증 코드')
        ? 'RESET_CODE'
        : errMessage.startsWith('이메일')
          ? 'EMAIL'
          : errMessage.startsWith('password')
            ? 'PASSWORD'
            : 'ID';
      const reason =
        error.status === 400
          ? 'BAD_REQUEST'
          : error.status === 404
            ? 'NOT_FOUND'
            : error.status === 401
              ? 'UNAUTHORIZED'
              : 'INTERNAL_SERVER_ERROR';

      pushAlert({
        target,
        type: 'FAILURE',
        status: error.status,
        reason,
      });
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
              text: `${recievedResetCode ? '재설정' : '인증번호'}`,
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
