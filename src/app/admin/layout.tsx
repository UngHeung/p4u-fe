import style from '@/components/admin/styles/admin.module.css';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={style.adminMain}>
      <h2 className="a11y-hidden">관리자</h2>
      {children}
    </main>
  );
};

export default layout;
