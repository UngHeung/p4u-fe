import { authAxios } from '@/apis/axiosInstance';
import { UserProps, UserStore, useUserStore } from '@/stores/user/userStore';
import { SetStateAction } from 'react';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import style from './styles/card.module.css';

const CardHeader = ({
  id,
  writer,
  pickers,
  answered,
  setAnswered,
  disabled,
  setDisabled,
}: {
  id: number;
  writer: Pick<UserProps, 'id' | 'name'>;
  pickers: Pick<UserProps, 'id'>[];
  answered: boolean;
  setAnswered: React.Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserStore((state: UserStore) => state.user);

  const handleAnswered = async () => {
    setAnswered(prev => !prev);
    setDisabled(true);

    const data = {
      isAnswered: !answered,
    };

    try {
      const url = `${BASE_URL}/card/${id}/answered`;
      const response = await authAxios.patch(url, data);

      setAnswered(response.data.isAnswered);
    } catch (error: any) {
    } finally {
      setDisabled(false);
    }
  };

  return (
    <header className={style.cardHeader}>
      <span className={style.cardInfo}>
        {svgIcons.heart()}
        <strong>{`${pickers ? pickers.length : 0}명`}</strong>
        <span>{`이 이 기도제목을 위해 기도${answered ? '했습니다.' : '하고있습니다.'}`}</span>
      </span>

      <span>
        {user.id === writer.id ? (
          <button
            type={'button'}
            name={'isAnswered'}
            onClick={event => {
              event.stopPropagation();
              handleAnswered();
            }}
            disabled={disabled}
          >
            {svgIcons.answered()}
          </button>
        ) : answered ? (
          svgIcons.answered()
        ) : (
          <button
            type={'button'}
            name={'pick'}
            onClick={event => {
              event.stopPropagation();
            }}
          >
            {svgIcons.checked(false)}
          </button>
        )}
      </span>
    </header>
  );
};

export default CardHeader;
