'use client';

import { authAxios } from '@/apis/axiosInstance';
import MainButton from '@/components/common/button/MainButton';
import { svgIcons } from '@/components/common/functions/getSvg';
import AuthInput from '@/components/common/input/AuthInput';
import Loading from '@/components/common/Loading';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import style from '../styles/my.module.css';
import ChangePassword from './ChangePassword';

const MyPageMain = () => {
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [disabled, setDisabled] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [isOnChangePassword, setIsOnChangePassword] = useState(false);
  const [isOnEmailAuth, setIsOnEmailAuth] = useState(false);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      setIsLoading(true);
      const response = await getUser();

      setNickname(response.nickname);
      setEmail(response.email);
      setIsLoading(false);

      return response;
    },
    staleTime: 1000 * 60 * 3, // 3분 동안 데이터가 유효
    refetchOnMount: true,
  });

  const [isPassedEmailAuth, setIsPassedEmailAuth] = useState(
    data?.emailVerified ?? false,
  );

  const [nickname, setNickname] = useState<string>(data?.nickname ?? '');
  const [isShowNickname, setIsShowNickname] = useState(
    data?.isShowNickname ?? false,
  );
  const [email, setEmail] = useState<string>(data?.email ?? '');
  const [emailAuthCode, setEmailAuthCode] = useState('');
  const [isEmailAuthLoading, setIsEmailAuthLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const currentUser = { ...data };

  const updateUser = useMutation({
    mutationFn: () => {
      return authAxios.patch('/user/update/nickname', {
        nickname,
        isShowNickname,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      pushAlertQueue('수정에 성공했습니다.', 'success');

      setNickname(nickname);
      setIsShowNickname(isShowNickname);

      currentUser.nickname = nickname;
      currentUser.isShowNickname = isShowNickname;
      setDisabled(false);
    },
    onError: (error: any) => {
      setNickname(currentUser.nickname);
      setIsShowNickname(currentUser.isShowNickname);

      if (error.status === '409') {
        pushAlertQueue('이미 사용중인 닉네임입니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 생겼습니다.', 'failure');
      }
    },
    onSettled: () => {
      setDisabled(false);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (email && email.length > 0 && email === data?.email) {
      setIsPassedEmailAuth(true);
    } else {
      setIsPassedEmailAuth(false);
    }
  }, [email]);

  // 이메일 인증코드 요청
  const handleEmailAuth = async () => {
    setDisabled(true); // 버튼 비활성화
    setIsEmailAuthLoading(true); // 로딩 활성화

    try {
      const response = await authAxios.post('/user/request/email', {
        email,
      });

      if (response.status === 200 || response.status === 201) {
        pushAlertQueue('이메일 인증 요청에 성공했습니다.', 'success');
      }
    } catch (error: any) {
      if (error.status === '404') {
        pushAlertQueue('이메일 인증에 실패했습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 생겼습니다.', 'failure');
      }
    } finally {
      setIsOnEmailAuth(true);
      setIsEmailAuthLoading(false);
    }
  };

  // 이메일 인증 완료
  const handleEmailAuthComplete = async () => {
    try {
      const response = await authAxios.post('/user/verify/email', {
        email,
        code: emailAuthCode,
      });

      if (response.status === 200 || response.status === 201) {
        pushAlertQueue('이메일 인증에 성공했습니다.', 'success');
        currentUser.email = email;
        setIsPassedEmailAuth(true);
      }
    } catch (error: any) {
      if (error.status === '404') {
        pushAlertQueue('이메일 인증에 실패했습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 생겼습니다.', 'failure');
      }
    } finally {
      setIsOnEmailAuth(false);
      setDisabled(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await authAxios.get('/user/myinfo');
      return response.data;
    } catch (error: any) {
      if (error.status === '404') {
        pushAlertQueue('유저가 존재하지 않습니다.', 'failure');
      } else {
        pushAlertQueue(
          '데이터를 불러오는 데 실패했습니다.\n잠시 후 다시 시도해주세요.',
          'failure',
        );
      }
    }
  };

  // 최종 저장
  const handleUpdateUser = () => {
    if (
      currentUser.email === email &&
      currentUser.nickname === nickname &&
      currentUser.isShowNickname === isShowNickname
    ) {
      pushAlertQueue('변경할 내용이 없습니다.', 'failure');
      return;
    }

    if (currentUser.email !== email && !isPassedEmailAuth) {
      pushAlertQueue('이메일 인증을 진행해주세요.', 'failure');
      return;
    }

    updateUser.mutate();
  };

  const handleChangePassword = () => {
    setIsOnChangePassword(true);
  };

  return isLoading ? (
    <Loading color={'#222222'} />
  ) : (
    <section className={style.formWrap}>
      <form onSubmit={handleUpdateUser} className={style.myUpdateForm}>
        <div className={style.inputWrap}>
          <AuthInput
            id={'email'}
            name={'email'}
            labelValue={'이메일'}
            labelClass={style.inputLabel}
            className={style.input}
            value={email}
            setValue={setEmail}
            readOnly={isPassedEmailAuth}
          />

          <button
            type={'button'}
            onClick={() => {
              if (!isPassedEmailAuth && !isEmailAuthLoading) {
                handleEmailAuth();
              }
            }}
            className={style.emailAuthButton}
            disabled={
              !email ||
              !email.includes('@') ||
              !email.includes('.') ||
              isEmailAuthLoading
            }
          >
            <span className={style.emailAuthButtonText}>
              {isEmailAuthLoading ? (
                <span className={style.loadingWrap}>
                  {svgIcons.loadingSmall('#90A4AE')}
                </span>
              ) : isPassedEmailAuth ? (
                <>인증완료 {svgIcons.verified()}</>
              ) : (
                <>인증하기 {svgIcons.verified('#90A4AE')}</>
              )}
            </span>
          </button>

          {isOnEmailAuth && (
            <div className={style.emailAuthCover}>
              <section className={style.emailAuthWrap}>
                <AuthInput
                  id={'emailAuthCode'}
                  name={'emailAuthCode'}
                  labelValue={'인증번호'}
                  labelClass={style.inputLabel}
                  className={`${style.input} ${style.authCodeInput}`}
                  value={emailAuthCode}
                  setValue={setEmailAuthCode}
                  maxLength={6}
                />
                <div className={style.authCodeButtonWrap}>
                  <MainButton
                    id={'authCodeCancelButton'}
                    type={'button'}
                    value={{ text: '취소' }}
                    className={style.authCodeButton}
                    onClick={() => setIsOnEmailAuth(false)}
                  />

                  <MainButton
                    id={'authCodeConfirmButton'}
                    type={'button'}
                    value={{ text: '확인', icon: svgIcons.enter('medium') }}
                    className={style.authCodeButton}
                    onClick={handleEmailAuthComplete}
                  />
                </div>
              </section>
            </div>
          )}

          <div className={style.line}></div>

          <AuthInput
            id={'name'}
            name={'name'}
            labelValue={'이름'}
            labelClass={style.inputLabel}
            className={style.input}
            readOnly
            value={currentUser.name}
          />

          <AuthInput
            id={'nickname'}
            name={'nickname'}
            labelValue={'별명'}
            labelClass={style.inputLabel}
            className={style.input}
            readOnly={!isOnEdit}
            value={nickname}
            setValue={setNickname}
            maxLength={6}
          />

          <div className={style.isShowNicknameWrap}>
            <input
              type={'checkbox'}
              id={'isShowNickname'}
              checked={isShowNickname}
              onChange={event => {
                if (nickname && nickname.length > 0) {
                  setIsShowNickname(event.target.checked);
                } else {
                  pushAlertQueue('별명을 입력해주세요.', 'failure');
                }
              }}
              readOnly={!isOnEdit}
            />
            <label
              htmlFor={'isShowNickname'}
              className={style.isShowNicknameLabel}
            ></label>
            <span className={style.isShowNicknameText}>
              {`${isShowNickname ? '별명' : '이름'}으로 활동하기`}
            </span>
          </div>
        </div>

        {!isOnEdit && (
          <div className={style.buttonWrap}>
            <button
              className={style.changePasswordButton}
              type={'button'}
              onClick={() => setIsOnChangePassword(prev => !prev)}
              disabled={disabled}
            >
              비밀번호 변경하기
            </button>

            <MainButton
              id={'editButton'}
              type={'button'}
              value={{ text: '수정하기', icon: svgIcons.enter('medium') }}
              className={`${style.button} ${style.submit}`}
              onClick={() => setIsOnEdit(true)}
              disabled={disabled}
            />
          </div>
        )}

        {isOnEdit && (
          <div className={style.buttonWrap}>
            <MainButton
              id={'cancelButton'}
              type={'button'}
              value={{ text: '취소하기' }}
              className={style.button}
              onClick={() => {
                setIsOnEdit(false);
                setNickname(data?.nickname);
                setEmail(data?.email);
              }}
              disabled={disabled}
            />

            <MainButton
              id={'saveButton'}
              type={'submit'}
              value={{ text: '저장하기', icon: svgIcons.enter('medium') }}
              className={`${style.button} ${style.submit}`}
              onClick={() => {
                handleUpdateUser();
                setIsOnEdit(false);
              }}
              disabled={disabled}
            />
          </div>
        )}
      </form>

      {isOnChangePassword && (
        <ChangePassword setIsOnChangePassword={setIsOnChangePassword} />
      )}
    </section>
  );
};

export default MyPageMain;
