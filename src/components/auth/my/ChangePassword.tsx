import { authAxios } from '@/apis/axiosInstance';
import {
  ERROR_MESSAGE_ENUM,
  VALIDATION_MESSAGE_ENUM,
} from '@/components/alert/constants/message.enum';
import MainButton from '@/components/common/button/MainButton';
import { svgIcons } from '@/components/common/functions/getSvg';
import AuthInput from '@/components/common/input/AuthInput';
import { useAlertStore } from '@/stores/alert/alertStore';
import { Dispatch, SetStateAction, useState } from 'react';
import style from '../styles/my.module.css';

const ChangePassword = ({
  setIsOnChangePassword,
}: {
  setIsOnChangePassword: Dispatch<SetStateAction<boolean>>;
}) => {
  const pushAlertQueue = useAlertStore(state => state.pushAlertQueue);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setDisabled(true);

    if (!password) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_PASSWORD, 'failure');
      setDisabled(false);
      return;
    }

    if (!newPassword) {
      pushAlertQueue(VALIDATION_MESSAGE_ENUM.EMPTY_NEW_PASSWORD, 'failure');
      setDisabled(false);
      return;
    }

    try {
      const response = await authAxios.patch('/user/update/password', {
        password,
        newPassword,
      });

      if (response.status === 200) {
        pushAlertQueue('비밀번호가 변경되었습니다.', 'success');
        setIsOnChangePassword(false);
      }
    } catch (error: any) {
      if (error.status === 401) {
        pushAlertQueue(ERROR_MESSAGE_ENUM.UNAUTHORIZED_PASSWORD, 'failure');
      } else {
        pushAlertQueue(ERROR_MESSAGE_ENUM.INTERNAL_SERVER_EXCEPTION, 'failure');
        console.error(error);
      }
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
