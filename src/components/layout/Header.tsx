'use client';

import { baseAxios } from '@/apis/axiosInstance';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BaseButton from '../common/button/BaseButton';
import { BASE_URL } from '../common/constants/baseUrl';
import { svgIcons } from '../common/functions/getSvg';
import style from './styles/layout.module.css';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await baseAxios.post(`${BASE_URL}/auth/logout`);

    localStorage.clear();
    router.push('/');
  };

  return (
    <header className={style.mainHeader}>
      <section className={style.logoWrap}>
        <h2 className={style.logo}>P4U</h2>
      </section>

      <section>
        <Link href={'/'}>로그인</Link>
        <Link href={'/signup'}>회원가입</Link>
        <Link href={'/card/write'}>새카드</Link>
        <Link href={'/card/list'}>내카드</Link>
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
