import { useEffect } from 'react';
import { AlertProps } from '../common/alert/const/alertInterface';
import useAlert from '../common/alert/useAlert';
import Alert from './Alert';
import style from './styles/alert.module.css';

const AlertQueue = ({ alerts }: { alerts: AlertProps[] }) => {
  const { resetQueue } = useAlert();

  useEffect(() => {
    const timer = setTimeout(() => {
      resetQueue();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [alerts]);

  return (
    <ul className={style.alertQueue}>
      {[...alerts].map((alert, idx) => {
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
