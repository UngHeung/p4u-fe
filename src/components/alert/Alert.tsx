'use client';

import icons from '@/public/icons/icon.png';
import {
  AlertProps,
  AlertStore,
  useAlertStore,
} from '@/stores/alert/alertStore';
import Image from 'next/image';
import style from './styles/alert.module.css';

const Alert = ({ message, index, type, isExiting }: AlertProps) => {
  const deleteAlertQueue = useAlertStore(
    (state: AlertStore) => state.deleteAlertQueue,
  );

  return (
    <article
      className={`${style.alertWrap}${isExiting ? ' ' + style.fadeOut : ''}`}
      style={{
        backgroundColor:
          type === 'success'
            ? '#00695C'
            : type === 'failure'
              ? '#E53935'
              : '#FFA000',
      }}
    >
      <span
        className={style.alertIcon}
        onClick={() => {
          deleteAlertQueue(index!);
        }}
      >
        <Image
          src={icons}
          alt={'태그_아이콘'}
          width={120}
          height={100}
          sizes="100%"
        />
      </span>
      <pre className={style.alertMessage}>{message}</pre>
    </article>
  );
};

export default Alert;
