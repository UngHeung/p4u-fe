import styles from './styles/thanks.module.css';

interface ThanksContentProps {
  content: string;
}

const ThanksContent = ({ content }: ThanksContentProps) => {
  return <section className={styles.thanksContent}>{content}</section>;
};

export default ThanksContent;
