import style from '@/components/card/styles/card.module.css';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={style.cardMain}>
      <h2 className="a11y-hidden">카드</h2>
      {children}
    </main>
  );
};

export default layout;
