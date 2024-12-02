'use client';

import style from '@/components/admin/styles/admin.module.css';
import ErrorPage from '@/components/common/error/ErrorPage';
import { useUserStore } from '@/stores/user/userStore';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore(state => state.user);

  if (!user || user.userRole !== 'ROLE_ADMIN') {
    return <ErrorPage error="403" />;
  }

  return (
    <main className={style.adminMain}>
      <h2 className="a11y-hidden">관리자</h2>
      {children}
    </main>
  );
};

export default AdminLayout;
