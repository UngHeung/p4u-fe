import {
  AlertProps,
  AlertStore,
  useAlertStore,
} from '@/stores/alert/alertStore';
import { useEffect, useState } from 'react';
import Alert from './Alert';
import style from './styles/alert.module.css';

const AlertQueue = ({ alerts }: { alerts: AlertProps[] }) => {
  const [isExiting, setIsExiting] = useState(false);
  const alertQueue = useAlertStore((state: AlertStore) => state.alertQueue);
  const resetAlertQueue = useAlertStore(
    (state: AlertStore) => state.resetAlertQueue,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        resetAlertQueue();
        setIsExiting(false);
      }, 300);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [alertQueue]);

  return (
    <ul className={style.alertQueue}>
      {[...alerts].map((alert, idx) => {
        return (
          <li key={idx}>
            <Alert
              message={alert.message}
              index={idx}
              type={alert.type}
              isExiting={isExiting}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default AlertQueue;
