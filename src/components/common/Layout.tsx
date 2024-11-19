'use client';

import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import { UserStore, useUserStore } from '@/stores/user/userStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import AlertQueue from '../alert/AlertQueue';
import Header from '../layout/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const alerts = useAlertStore((state: AlertStore) => state.alertQueue);
  const user = useUserStore((state: UserStore) => state.user);
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const isHydrate = useUserStore((state: UserStore) => state.isHydrated);

  return (
    <>
      {isHydrate && (
        <>
          <Header />
          {children}
          {alerts.length > 0 && <AlertQueue alerts={alerts} />}
        </>
      )}
    </>
  );
};

export default Layout;
