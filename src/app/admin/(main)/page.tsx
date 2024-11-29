'use client';

import Link from 'next/link';
import styles from '@/components/admin/styles/admin.module.css';

const AdminPage = () => {
  return (
    <section className={styles.adminPage}>
      <Link href={'/admin/warning'}>미사용태그삭제</Link>
      <Link href={'/admin/inactive'}>비활성화된 카드</Link>
      <Link href={'/admin/inactive/thanks'}>비활성화된 감사</Link>
    </section>
  );
};

export default AdminPage;
