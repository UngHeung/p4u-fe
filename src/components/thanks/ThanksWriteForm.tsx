import React, { useRef, useState } from 'react';
import styles from './styles/thanks.module.css';
import { svgIcons } from '../common/functions/getSvg';

const ThanksWriteForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePlaceholderClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <div className={styles.thanksWriteForm}>
      <textarea
        ref={textareaRef}
        name="content"
        onFocus={() => setIsFocused(true)}
        onBlur={event => {
          if (!event.target.value) {
            setIsFocused(false);
          }
        }}
      />
      {!isFocused && (
        <span className={styles.placeholder} onClick={handlePlaceholderClick}>
          {'오늘도 하루를 허락해주셔서 감사해요.'}
        </span>
      )}
      <button>
        {svgIcons.enter(
          'large',
          isFocused ? '#222222' : 'var(--color-placeholder)',
        )}
      </button>
    </div>
  );
};

export default ThanksWriteForm;
