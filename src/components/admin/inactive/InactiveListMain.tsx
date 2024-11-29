import Link from 'next/link';
import styles from '../styles/admin.module.css';
const InactiveListMain = () => {
  return (
    <section className={styles.inactiveListMain}>
      <ul>
        <li>
          <Link href={'/admin/inactive/card'}>비활성화된 카드</Link>
        </li>
        <li>
          <Link href={'/admin/inactive/thanks'}>비활성화된 감사</Link>
        </li>
      </ul>
    </section>
  );
};

export default InactiveListMain;
