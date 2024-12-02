import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { AlertMessageProps } from './const/alertInterface';
import { generateAlertMessage } from './handlers/mappedAlertMessage';

const useAlert = () => {
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );
  const shiftAlert = useAlertStore(
    (state: AlertStore) => state.shiftAlertQueue,
  );
  const deleteAlert = useAlertStore(
    (state: AlertStore) => state.deleteAlertQueue,
  );
  const resetQueue = useAlertStore(
    (state: AlertStore) => state.resetAlertQueue,
  );

  const pushAlert = ({ target, type, status, reason }: AlertMessageProps) => {
    pushAlertQueue(
      generateAlertMessage({ target, type, status, reason }),
      type,
    );
  };

  return { pushAlert, shiftAlert, deleteAlert, resetQueue };
};

export default useAlert;
