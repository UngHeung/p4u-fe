'use client';

import style from '@/components/admin/styles/admin.module.css';
import WarningSection from '@/components/admin/warning/Warning';

const AdminPage = () => {
  return (
    <section className={style.adminWrap}>
      <WarningSection />
    </section>
  );
};

export default AdminPage;
