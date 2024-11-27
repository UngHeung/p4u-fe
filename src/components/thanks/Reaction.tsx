import emojis from '@/public/emoji/emoji.png';
import Image from 'next/image';
import styles from './styles/thanks.module.css';

export type ReactionType = 'smile' | 'heart' | 'thumbsup' | 'clap' | 'party';

export interface ReactionProps {
  type: ReactionType;
  count: number;
}

const Reaction = ({ type, count }: ReactionProps) => {
  return (
    <button type="button" name={type} className={styles.reactionWrap}>
      <span className={styles.reaction}>
        <Image
          src={emojis}
          alt={type}
          width={75}
          height={15}
          sizes="100%"
          style={{
            objectPosition:
              type === 'heart'
                ? '15px 0'
                : type === 'thumbsup'
                  ? '0 0'
                  : type === 'clap'
                    ? '-15px 0'
                    : type === 'party'
                      ? '-30px 0'
                      : '30px 0',
          }}
        />
      </span>
      <span className={styles.reactionCount}>{count}</span>
    </button>
  );
};

export default Reaction;
