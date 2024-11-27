import Reaction, { ReactionProps } from './Reaction';
import styles from './styles/thanks.module.css';

const ReactionList = ({ reactions }: { reactions: ReactionProps[] }) => {
  return (
    <ul className={styles.reactionList}>
      {reactions.map((reaction, index) => (
        <li key={index}>
          <Reaction {...reaction} />
        </li>
      ))}
    </ul>
  );
};

export default ReactionList;
