'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import { useRouter } from 'next/navigation';
import BaseButton from '../common/button/BaseButton';
import { setToken } from '../common/constants/accessToken';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import MainNav from './MainNav';
import style from './styles/layout.module.css';

const Header = () => {
  const router = useRouter();

  const setIsLoggedIn = useUserStore((state: UserStore) => state.setIsLoggedIn);

  const handleLogout = async () => {
    const response = await baseAxios.post(`${BASE_URL}/auth/logout`);

    setIsLoggedIn(false);
    setToken({ isAccess: true, accessToken: '' });
    localStorage.clear();
    router.push('/');
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
        <BaseButton
          id={''}
          type={'button'}
          className={''}
          value={{ icon: svgIcons.loggedOut() }}
          onClick={handleLogout}
        />
      </section>
    </header>
  );
};

export default Header;
