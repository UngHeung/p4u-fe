import { authAxios } from '@/apis/axiosInstance';
import useAlert from '@/components/common/alert/useAlert';
import { useState } from 'react';
import style from '../styles/admin.module.css';

const WarningSection = () => {
  const { pushAlert } = useAlert();

  const [disabled, setDisabled] = useState(false);

  const handleDeleteUnusedTag = async () => {
    setDisabled(true);
    try {
      const response = await authAxios.delete(`/tag/clear`);

      if (response.status === 200) {
        pushAlert({
          target: 'DELETE_UNUSED_TAG',
          type: 'SUCCESS',
          status: 200,
        });
      }
    } catch (error: any) {
      pushAlert({
        target: 'TAG',
        type: 'FAILURE',
        status: error.status,
        reason: error.status === 403 ? 'FORBIDDEN' : 'INTERNAL_SERVER_ERROR',
      });
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
