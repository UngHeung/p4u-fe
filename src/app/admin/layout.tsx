'use client';

import AdminMenu from '@/components/admin/AdminMenu';
import style from '@/components/admin/styles/admin.module.css';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={style.adminMain}>
      <h2 className="a11y-hidden">관리자</h2>
      {children}
      <AdminMenu />
    </main>
  );
};

export default AdminLayout;
