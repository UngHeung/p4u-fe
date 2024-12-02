'use client';

import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import AlertQueue from '../alert/AlertQueue';
import Header from '../layout/Header';
import AdminMenu from '../admin/AdminMenu';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const alerts = useAlertStore((state: AlertStore) => state.alertQueue);
  const user = useUserStore((state: UserStore) => state.user);
  const isHydrate = useUserStore((state: UserStore) => state.isHydrated);

  return (
    <>
      {isHydrate && (
        <>
          <Header />
          {children}
          {alerts.length > 0 && <AlertQueue alerts={alerts} />}
          {user.userRole === 'ROLE_ADMIN' && <AdminMenu />}
        </>
      )}
    </>
  );
};

export default Layout;
