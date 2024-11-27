import reactionIcon from '@/public/emoji/emoji.png';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles/thanks.module.css';

const AddReactionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={styles.addReactionButton}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Image
        src={reactionIcon}
        alt="reaction"
        width={75}
        height={15}
        sizes="100%"
      />
    </button>
  );
};

export default AddReactionButton;
