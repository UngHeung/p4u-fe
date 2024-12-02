import { UserProps, useUserStore } from '@/stores/user/userStore';
import { useState } from 'react';
import AddReactionButton from './AddReactionButton';
import { MyReactionProps } from './Reaction';
import ReactionList from './ReactionList';
import styles from './styles/thanks.module.css';
import ThanksBoxMenu from './ThanksBoxMenu';
import ThanksContent from './ThanksContent';
import ThanksUpdateForm from './ThanksUpdateForm';

export interface ThanksBoxProps {
  id: number;
  writer: UserProps;
  content: string;
  reactions: MyReactionProps[];
  reactionsCount: {
    smile: number;
    heart: number;
    thumbsup: number;
    clap: number;
    party: number;
  };
  reports: Pick<UserProps, 'id'>[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ThanksBox = ({
  id,
  writer,
  content,
  reactions,
  reactionsCount,
  createdAt,
  isActive,
  updatedAt,
  reports,
}: ThanksBoxProps) => {
  const user = useUserStore(state => state.user);

  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <section
        className={`${styles.thanksBox} ${
          user && user.id === writer?.id ? styles.myBox : ''
        }`}
      >
        <section className={styles.thanksBoxInfo}>
          <span className={styles.thanksBoxWriter}>
            {writer.isShowNickname ? writer.nickname : writer.name}
          </span>
          <span className={styles.thanksBoxTime}>
            {`${updatedAt !== createdAt ? getTimeAgo(updatedAt) + ' 수정됨' : getTimeAgo(createdAt)}`}
          </span>
        </section>
        <ThanksContent content={content} />
        <section className={styles.thanksBoxReactions}>
          <AddReactionButton
            id={id}
            reactions={reactions}
            writer={writer}
            setIsDisabled={setIsDisabled}
          />
          <ReactionList
            id={id}
            reactionsCount={reactionsCount}
            reactions={reactions}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        </section>
        <ThanksBoxMenu
          id={id}
          isActive={isActive}
          writer={writer}
          content={content}
          reactionsCount={reactionsCount}
          reactions={reactions}
          reports={reports}
          createdAt={createdAt}
          updatedAt={updatedAt}
          setIsEdit={setIsEdit}
        />
      </section>
      {isEdit && (
        <ThanksUpdateForm
          id={id}
          currentContent={content}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default ThanksBox;

const getTimeAgo = (date: string) => {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = now - time;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};
