import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <h2 className="a11y-hidden">회원</h2>
      {children}
    </main>
  );
};

export default layout;
