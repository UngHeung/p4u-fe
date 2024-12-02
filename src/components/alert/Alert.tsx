'use client';

import { AlertProps } from '../common/alert/const/alertInterface';
import useAlert from '../common/alert/useAlert';
import { svgIcons } from '../common/functions/getSvg';
import style from './styles/alert.module.css';

const Alert = ({ message, index, type }: AlertProps) => {
  const { deleteAlert } = useAlert();

  return (
    <article
      className={style.alertWrap}
      style={{
        backgroundColor:
          type === 'SUCCESS'
            ? '#00695C'
            : type === 'FAILURE'
              ? '#E53935'
              : '#FFA000',
      }}
    >
      <span
        className={style.alertIcon}
        onClick={() => {
          deleteAlert(index!);
        }}
      >
        {svgIcons.close('#FFFFFF')}
      </span>
      <pre className={style.alertMessage}>{message}</pre>
    </article>
  );
};

export default Alert;
