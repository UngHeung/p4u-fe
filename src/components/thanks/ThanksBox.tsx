import { useState } from 'react';
import AddReactionButton from './AddReactionButton';
import { ReactionProps } from './Reaction';
import ReactionList from './ReactionList';
import ThanksContent from './ThanksContent';
import styles from './styles/thanks.module.css';
import { svgIcons } from '../common/functions/getSvg';

export interface ThanksBoxProps {
  content: string;
  reactions: ReactionProps[];
}

const ThanksBox = ({ content, reactions }: ThanksBoxProps) => {
  // 임시
  const [isMyBox, setIsMyBox] = useState(false);

  return (
    <section
      className={`${styles.thanksBox} ${isMyBox ? styles.myBox : ''}`}
      onClick={() => setIsMyBox(!isMyBox)}
    >
      <ThanksContent content={content} />
      {reactions.length ? (
        <ReactionList reactions={reactions} />
      ) : (
        <AddReactionButton />
      )}
      <button
        onClick={event => {
          event.stopPropagation();
        }}
        className={styles.thanksBoxMenuButton}
      >
        {svgIcons.menu(isMyBox ? '#ffffff' : '#222222')}
      </button>
    </section>
  );
};

export default ThanksBox;
