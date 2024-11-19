'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import { useRouter } from 'next/navigation';
import BaseButton from '../common/button/BaseButton';
import { setToken } from '../common/constants/accessToken';
import { BASE_URL } from '../common/constants/baseUrl';
import MainNav from './MainNav';
import style from './styles/layout.module.css';

const Header = () => {
  const router = useRouter();
  const isLoggedIn = useUserStore((state: UserStore) => state.isLoggedIn);
  const setIsLoggedIn = useUserStore((state: UserStore) => state.setIsLoggedIn);
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const handleLogout = async () => {
    try {
      const response = await baseAxios.post(`${BASE_URL}/auth/logout`);

      if (response.status === 201) {
        pushAlertQueue('로그아웃이 완료되었습니다.', 'success');
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoggedIn(false);
      setToken({ isAccess: true, accessToken: '' });
      localStorage.clear();
      router.push('/');
    }
  };

  return (
    <header className={style.mainHeader}>
      <section className={style.logoWrap}>
        <h2 className={style.logo}>P4U</h2>
      </section>

      <section>
        <MainNav />
      </section>

      <section className={style.buttonWrap}>
        {isLoggedIn && (
          <BaseButton
            id={''}
            type={'button'}
            className={''}
            value={{ text: '로그아웃' }}
            onClick={handleLogout}
          />
        )}
      </section>
    </header>
  );
};

export default Header;
