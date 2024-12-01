import { baseAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { CardTypeStore, useCardTypeStore } from '@/stores/card/cardTypeStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BaseButton from '../common/button/BaseButton';
import { setToken } from '../common/constants/accessToken';
import { svgIcons } from '../common/functions/getSvg';
import style from './styles/layout.module.css';

const MainNav = () => {
  const router = useRouter();

  const setCardTypeStore = useCardTypeStore(
    (state: CardTypeStore) => state.setCardListType,
  );
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );
  const user = useUserStore((state: UserStore) => state.user);
  const setIsLoggedIn = useUserStore((state: UserStore) => state.setIsLoggedIn);
  const isLoggedIn = useUserStore((state: UserStore) => state.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const response = await baseAxios.post(`/auth/logout`);

      if (response.status === 201) {
        pushAlertQueue('로그아웃이 완료되었습니다.', 'success');
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoggedIn(false);
      setToken({ accessToken: '', refreshToken: '' });
      localStorage.clear();
      router.push('/');
    }
  };

  return (
    <nav className={style.navWrap}>
      {isMenuOpen && (
        <div
          className={style.overlay}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <ul className={`${style.mainNav}${isMenuOpen ? ' ' + style.open : ''}`}>
        {isLoggedIn ? (
          <>
            <li>
              <Link href={'/my'} onClick={() => setIsMenuOpen(false)}>
                <strong className={style.userName}>{user?.name}</strong>
              </Link>
              <span className={style.welcome}>님 환영합니다.</span>
            </li>
            <li>
              <Link href={'/card/write'} onClick={() => setIsMenuOpen(false)}>
                기도카드쓰기
              </Link>
            </li>
            <li>
              <Link
                href={'/card/list'}
                onClick={event => {
                  event.preventDefault();
                  queryClient.removeQueries({ queryKey: ['cards'] });
                  setCardTypeStore('my');
                  setIsMenuOpen(false);
                  router.push('/card/list');
                }}
              >
                내카드보기
              </Link>
            </li>
            <li>
              <Link
                href={'/card/list'}
                onClick={event => {
                  event.preventDefault();
                  setCardTypeStore('all');
                  setIsMenuOpen(false);
                  router.push('/card/list');
                }}
              >
                기도카드
              </Link>
            </li>
            <li>
              <Link href={'/card/today'} onClick={() => setIsMenuOpen(false)}>
                오늘의기도카드
              </Link>
            </li>
            <li>
              <Link href={'/thanks'} onClick={() => setIsMenuOpen(false)}>
                오늘도감사하기
              </Link>
            </li>
            <li>
              <BaseButton
                id={''}
                type={'button'}
                className={style.loggedButton}
                value={{ icon: svgIcons.logout('#222222') }}
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/card/list'}>기도카드</Link>
            </li>
            <li>
              <Link href={'/signup'}>회원가입</Link>
            </li>
            <li>
              <BaseButton
                id={''}
                type={'button'}
                className={style.loggedButton}
                value={{ icon: svgIcons.login('#222222') }}
                onClick={() => {
                  setIsMenuOpen(false);
                  router.replace('/');
                }}
              />
            </li>
          </>
        )}
      </ul>

      <button
        className={style.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="메뉴 열기"
      >
        <span className={style.menuIcon}></span>
      </button>
    </nav>
  );
};

export default MainNav;
