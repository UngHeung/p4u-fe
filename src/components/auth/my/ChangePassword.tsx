import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import MainButton from '@/components/common/button/MainButton';
import { svgIcons } from '@/components/common/functions/getSvg';
import AuthInput from '@/components/common/input/AuthInput';
import { Dispatch, SetStateAction, useState } from 'react';
import style from '../styles/my.module.css';

const ChangePassword = ({
  setIsOnChangePassword,
}: {
  setIsOnChangePassword: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pushAlert } = useAlert();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setDisabled(true);

    if (!password) {
      pushAlert({
        target: 'PASSWORD',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
      setDisabled(false);
      return;
    }

    if (!newPassword) {
      pushAlert({
        target: 'PASSWORD',
        type: 'FAILURE',
        status: 400,
        reason: 'NOT_FOUND',
      });
      setDisabled(false);
      return;
    }

    try {
      const response = await authAxios.patch('/user/update/password', {
        password,
        newPassword,
      });

      if (response.status === 200) {
        pushAlert({
          target: 'PASSWORD',
          type: 'SUCCESS',
          status: 200,
        });
        setIsOnChangePassword(false);
      }
    } catch (error: any) {
      pushAlert({
        target: 'PASSWORD',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div
      className={style.changePasswordCover}
      onClick={() => setIsOnChangePassword(false)}
    >
      <form
        className={style.changePasswordForm}
        onClick={e => e.stopPropagation()}
        onSubmit={handleChangePassword}
      >
        <section className={style.changePasswordInputWrap}>
          <h2 className="a11y-hidden">비밀번호 변경</h2>

          <AuthInput
            id={'password'}
            name={'password'}
            type={'password'}
            labelValue={'비밀번호'}
            labelClass={style.inputLabel}
            className={style.input}
            value={password}
            setValue={setPassword}
          />

          <AuthInput
            id={'newPassword'}
            name={'newPassword'}
            type={'password'}
            labelValue={'새 비밀번호'}
            labelClass={style.inputLabel}
            className={style.input}
            value={newPassword}
            setValue={setNewPassword}
          />
        </section>

        <section className={style.buttonWrap}>
          <MainButton
            id={'cancelButton'}
            type={'button'}
            className={style.cancel}
            value={{ text: '취소' }}
            onClick={() => setIsOnChangePassword(false)}
            disabled={disabled}
          />

          <MainButton
            id={'changePassword'}
            type={'submit'}
            className={`${style.button} ${style.submit}`}
            value={{ text: '변경하기', icon: svgIcons.enter('medium') }}
            disabled={disabled}
          />
        </section>
      </form>
    </div>
  );
};

export default ChangePassword;
