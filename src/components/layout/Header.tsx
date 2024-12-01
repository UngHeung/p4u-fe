'use client';

import MainNav from './MainNav';
import style from './styles/layout.module.css';

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <section className={style.logoWrap}>
        <h2 className={style.logo}>P4U</h2>
      </section>

      <section className={style.mainNavWrap}>
        <MainNav />
      </section>
    </header>
  );
};

export default Header;
