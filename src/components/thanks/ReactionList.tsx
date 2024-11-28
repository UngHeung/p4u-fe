import { Dispatch, SetStateAction } from 'react';
import Reaction, { MyReactionProps, ReactionType } from './Reaction';
import styles from './styles/thanks.module.css';

const ReactionList = ({
  id,
  reactionsCount,
  reactions = [],
  isDisabled,
  setIsDisabled,
}: {
  id: number;
  reactionsCount: {
    smile: number;
    heart: number;
    thumbsup: number;
    clap: number;
    party: number;
  };
  reactions: MyReactionProps[];
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <ul className={styles.reactionList}>
      {reactions &&
        Object?.entries(reactionsCount).map(([type, count], index) => {
          if (count > 0) {
            return (
              <li key={index}>
                <Reaction
                  id={id}
                  type={type as ReactionType}
                  count={count}
                  reactions={reactions}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                />
              </li>
            );
          }
        })}
    </ul>
  );
};

export default ReactionList;
