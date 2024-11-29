import React from 'react';
import style from './styles/error.module.css';

export type ErrorTypes = '404' | '500' | '403' | '400' | '401' | '409';
export type ErrorMessages = {
  [key in ErrorTypes]: string;
};

const errorMessages: ErrorMessages = {
  '404': '페이지를 찾을 수 없습니다.',
  '500': '서버에 문제가 발생했습니다.',
  '403': '권한이 없습니다.',
  '400': '잘못된 요청입니다.',
  '401': '인증이 필요합니다.',
  '409': '중복된 요청입니다.',
};

const ErrorPage = ({ error }: { error: ErrorTypes }) => {
  return (
    <article className={style.errorWrap}>
      <h2 className={style.errorTitle}>{error}</h2>
      <p className={style.errorText}>{errorMessages[error]}</p>
    </article>
  );
};

export default ErrorPage;
