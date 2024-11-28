import emojis from '@/public/emoji/emoji.png';
import { AlertStore, useAlertStore } from '@/stores/alert/alertStore';
import {
  ThanksTypeProps,
  useThanksTypeStore,
} from '@/stores/thanks/thanksListTypeStore';
import { UserProps, useUserStore } from '@/stores/user/userStore';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import useReactionQuery from './handlers/useReactionQuery';
import { MyReactionProps } from './Reaction';
import styles from './styles/thanks.module.css';

const ReactionSelector = ({
  id,
  reactions,
  writer,
  isOpen,
  setIsOpen,
  setIsDisabled,
}: {
  id: number;
  reactions: MyReactionProps[];
  writer: UserProps;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserStore(state => state.user);
  const pushAlertQueue = useAlertStore(
    (state: AlertStore) => state.pushAlertQueue,
  );
  const thanksListType = useThanksTypeStore(
    (state: ThanksTypeProps) => state.thanksListType,
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
    <article
      className={`${styles.reactionSelector} ${
        user?.id === writer.id ? styles.mySelector : ''
      }`}
      style={{
        width: !isOpen ? '0' : '180px',
        padding: !isOpen ? '0' : '5px 0',
        opacity: !isOpen ? '0' : '1',
      }}
    >
      <li key="smile">
        <button
          type="button"
          className={styles.reactionSelectorButton}
          onClick={() => {
            reactionMutation.mutate({ type: 'smile' });
            setIsDisabled(false);
            setIsOpen(false);
          }}
        >
          <Image
            src={emojis}
            alt="smile"
            width={120}
            height={20}
            className={styles.smile}
          />
        </button>
      </li>
      <li key="heart">
        <button
          type="button"
          className={styles.reactionSelectorButton}
          onClick={() => {
            reactionMutation.mutate({ type: 'heart' });
            setIsDisabled(false);
            setIsOpen(false);
          }}
        >
          <Image
            src={emojis}
            alt="heart"
            width={120}
            height={20}
            className={styles.heart}
          />
        </button>
      </li>
      <li key="thumbsup">
        <button
          type="button"
          className={styles.reactionSelectorButton}
          onClick={() => {
            reactionMutation.mutate({ type: 'thumbsup' });
            setIsDisabled(false);
            setIsOpen(false);
          }}
        >
          <Image
            src={emojis}
            alt="thumbsup"
            width={120}
            height={20}
            className={styles.thumbsup}
          />
        </button>
      </li>
      <li key="clap">
        <button
          type="button"
          className={styles.reactionSelectorButton}
          onClick={() => {
            reactionMutation.mutate({ type: 'clap' });
            setIsDisabled(false);
            setIsOpen(false);
          }}
        >
          <Image
            src={emojis}
            alt="clap"
            width={120}
            height={20}
            className={styles.clap}
          />
        </button>
      </li>
      <li key="party">
        <button
          type="button"
          className={styles.reactionSelectorButton}
          onClick={() => {
            reactionMutation.mutate({ type: 'party' });
            setIsDisabled(false);
            setIsOpen(false);
          }}
        >
          <Image
            src={emojis}
            alt="party"
            width={120}
            height={20}
            className={styles.party}
          />
        </button>
      </li>
    </article>
  );
};

export default ReactionSelector;
