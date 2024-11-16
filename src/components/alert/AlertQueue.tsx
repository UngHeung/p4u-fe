import {
  AlertProps,
  AlertStore,
  useAlertStore,
} from '@/stores/alert/alertStore';
import { useEffect } from 'react';
import Alert from './Alert';
import style from './styles/alert.module.css';

const AlertQueue = ({ alerts }: { alerts: AlertProps[] }) => {
  const alertQueue = useAlertStore((state: AlertStore) => state.alertQueue);
  const emptyAlertQueue = useAlertStore(
    (state: AlertStore) => state.emptyAlertQueue,
  );

  useEffect(() => {
    const timer = setTimeout(() => emptyAlertQueue(), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [alertQueue]);

  return (
    <ul className={style.alertQueue}>
      {alerts.map((alert, idx) => {
        return (
          <li key={idx}>
            <Alert message={alert.message} index={idx} type={alert.type} />
          </li>
        );
      })}
    </ul>
  );
};

export default AlertQueue;
