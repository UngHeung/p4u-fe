import React from 'react';
import style from './styles/guide.module.css';

interface GuideProps {
  content: string;
  className?: string;
}

const Guide = ({ content, className }: GuideProps) => {
  return (
    <article
      className={`${style.guideWrap}${className ? ` ${className}` : ''}`}
    >
      {content}
    </article>
  );
};

export default Guide;
