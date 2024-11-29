import emojis from '@/public/emoji/emoji.png';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import {
  ThanksListStore,
  useThanksListStore,
} from '@/stores/thanks/thanksListTypeStore';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import useReactionQuery from './handlers/useReactionQuery';
import styles from './styles/thanks.module.css';

export type ReactionType = 'smile' | 'heart' | 'thumbsup' | 'clap' | 'party';

export interface MyReactionProps {
  id: number;
  type: ReactionType;
}

const Reaction = ({
  id,
  type,
  count,
  reactions,
  isDisabled,
  setIsDisabled,
}: {
  id: number;
  type: ReactionType;
  count: number;
  reactions: MyReactionProps[];
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );
  const thanksListType = useThanksListStore(
    (state: ThanksListStore) => state.thanksListType,
  );

  const reactionMutation = useReactionQuery(
    reactions.length > 0 ? 'update' : 'new',
    pushAlertQueue,
    thanksListType,
    id,
    reactions[0]?.id,
    setIsDisabled,
  );

  return (
    <button
      type="button"
      name={type}
      className={`${styles.reactionButton}${
        reactions[0]?.type === type ? ' ' + styles.myReaction : ''
      }`}
      onClick={() => reactionMutation.mutate({ type })}
      disabled={isDisabled}
    >
      <span className={styles.reaction}>
        <Image
          src={emojis}
          alt={type}
          width={120}
          height={20}
          sizes="100%"
          style={{
            objectPosition:
              type === 'heart'
                ? '25px 0'
                : type === 'thumbsup'
                  ? '0 0'
                  : type === 'clap'
                    ? '-25px 0'
                    : type === 'party'
                      ? '-50px 0'
                      : '50px 0',
          }}
        />
      </span>
      <span className={styles.reactionCount}>{count}</span>
    </button>
  );
};

export default Reaction;
