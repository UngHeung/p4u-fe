import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { useState } from 'react';
import style from '../styles/admin.module.css';

const WarningSection = () => {
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const [disabled, setDisabled] = useState(false);

  const handleDeleteUnusedTag = async () => {
    setDisabled(true);
    try {
      const response = await authAxios.delete(`/tag/clear`);

      if (response.status === 200) {
        pushAlertQueue('미사용 태그 삭제가 완료되었습니다.', 'success');
      }
    } catch (error: any) {
      if (error.status === 403) {
        pushAlertQueue('권한이 없습니다.', 'failure');
      } else {
        pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <section className={style.warning}>
      <button
        type={'button'}
        disabled={disabled}
        onClick={handleDeleteUnusedTag}
      >
        미사용태그삭제
      </button>
    </section>
  );
};

export default WarningSection;
