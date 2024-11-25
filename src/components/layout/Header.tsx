'use client';

import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import { useRouter } from 'next/navigation';
import BaseButton from '../common/button/BaseButton';
import { setToken } from '../common/constants/accessToken';
import MainNav from './MainNav';
import style from './styles/layout.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={style.mainHeader}>
      <section className={style.logoWrap}>
        <h2 className={style.logo}>P4U</h2>
      </section>

      <section>
        <MainNav />
      </section>
    </header>
  );
};

export default Header;
