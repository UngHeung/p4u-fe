import { useState, useEffect, useRef } from 'react';
import style from './styles/adminMenu.module.css';
import Link from 'next/link';

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={style.adminMenuContainer} ref={menuRef}>
      <button
        className={style.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="관리자 메뉴 토글"
        aria-expanded={isOpen}
      >
        {isOpen ? '×' : '+'}
      </button>

      <div
        className={`${style.adminMenu} ${isOpen ? style.open : style.closed}`}
        role="dialog"
        aria-label="관리자 메뉴"
      >
        <h2 className="a11y-hidden">관리자 메뉴</h2>
        <ul>
          <li className={style.menuItem}>
            <Link
              href={'/admin/inactive/card'}
              onClick={() => setIsOpen(false)}
            >
              비활성화된 카드
            </Link>
          </li>
          <li className={style.menuItem}>
            <Link
              href={'/admin/inactive/thanks'}
              onClick={() => setIsOpen(false)}
            >
              비활성화된 감사
            </Link>
          </li>

          <li className={style.menuItem}>
            <Link href={'/admin/warning'} onClick={() => setIsOpen(false)}>
              주의기능
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
