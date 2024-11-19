import { UserStore, useUserStore } from '@/stores/user/userStore';
import Link from 'next/link';
import style from './styles/layout.module.css';

const MainNav = () => {
  const isLoggedIn = useUserStore((state: UserStore) => state.isLoggedIn);

  return (
    <nav>
      <ul className={style.mainNav}>
        {isLoggedIn ? (
          <>
            <li>
              <Link href={'/card/write'}>기도카드쓰기</Link>
            </li>
            <li>
              <Link href={'/card/list'}>내카드보기</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/'}>로그인</Link>
            </li>
            <li>
              <Link href={'/card/list'}>기도카드</Link>
            </li>
            <li>
              <Link href={'/signup'}>회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
