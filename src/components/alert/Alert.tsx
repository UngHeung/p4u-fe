'use client';

import icons from '@/public/icons/icon.png';
import {
  AlertProps,
  AlertStore,
  useAlertStore,
} from '@/stores/alert/alertStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import style from './styles/alert.module.css';

const Alert = ({ message, index, type }: AlertProps) => {
  const deleteAlertQueue = useAlertStore(
    (state: AlertStore) => state.deleteAlertQueue,
  );

  const [opacity, setOpacity] = useState(0);
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    setOpacity(1);
    setBottom(15);

    setTimeout(() => {
      setOpacity(0);
      setBottom(0);
    }, 2700);
  }, []);

  return (
    <article
      className={style.alertWrap}
      style={{
        opacity,
        bottom,
        backgroundColor:
          type === 'success'
            ? '#02975E'
            : type === 'failure'
              ? '#E22929'
              : '#f3c90f',
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
