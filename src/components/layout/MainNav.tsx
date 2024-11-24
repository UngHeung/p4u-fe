import { authAxios } from '@/apis/axiosInstance';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { CardTypeStore, useCardTypeStore } from '@/stores/card/cardTypeStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import style from './styles/layout.module.css';

const MainNav = () => {
  const router = useRouter();

  const setCardTypeStore = useCardTypeStore(
    (state: CardTypeStore) => state.setCardListType,
  );
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );

  const isLoggedIn = useUserStore((state: UserStore) => state.isLoggedIn);
  const userRole = useUserStore((state: UserStore) => state.user.role);

  return (
    <nav>
      <ul className={style.mainNav}>
        {userRole === 'ROLE_ADMIN' && (
          <li>
            <Link
              onClick={async event => {
                event.preventDefault();
                try {
                  const response = await authAxios.get('/auth/isadmin');

                  if (response.status === 200) {
                    router.push('/admin');

                    pushAlertQueue('관리자 인증이 완료되었습니다.', 'success');
                  }
                } catch (error: any) {
                  console.error(error);
                  if (error.status === 403) {
                    pushAlertQueue('권한이 없습니다.', 'failure');
                  } else {
                    pushAlertQueue('서버에 문제가 발생했습니다.', 'failure');
                  }
                }
              }}
              href={'/admin'}
            >
              관리자
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <>
            <li>
              <Link href={'/card/write'}>기도카드쓰기</Link>
            </li>
            <li>
              <Link
                href={'/card/list'}
                onClick={event => {
                  event.preventDefault();
                  setCardTypeStore('all');
                  router.push('/card/list');
                }}
              >
                기도카드
              </Link>
            </li>
            <li>
              <Link
                href={'/card/list'}
                onClick={event => {
                  event.preventDefault();
                  setCardTypeStore('my');
                  router.push('/card/list');
                }}
              >
                내카드보기
              </Link>
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
