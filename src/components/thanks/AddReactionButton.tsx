import reactionIcon from '@/public/emoji/emoji.png';
import { UserProps, useUserStore } from '@/stores/user/userStore';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { MyReactionProps } from './Reaction';
import ReactionSelector from './ReactionSelector';
import styles from './styles/thanks.module.css';

const AddReactionButton = ({
  id,
  reactions,
  writer,
  setIsDisabled,
}: {
  id: number;
  reactions: MyReactionProps[];
  writer: UserProps;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUserStore(state => state.user);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`${styles.addReactionButton} ${
          user?.id === writer.id ? styles.myButton : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={reactionIcon}
          alt="reaction"
          width={120}
          height={20}
          sizes="100%"
        />
      </button>
      {isOpen && (
        <ReactionSelector
          id={id}
          reactions={reactions}
          writer={writer}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsDisabled={setIsDisabled}
        />
      )}
    </>
  );
};

export default AddReactionButton;
