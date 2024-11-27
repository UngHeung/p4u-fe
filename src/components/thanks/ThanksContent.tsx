import styles from './styles/thanks.module.css';

interface ThanksContentProps {
  content: string;
}

const ThanksContent = ({ content }: ThanksContentProps) => {
  return <pre className={styles.thanksContent}>{content}</pre>;
};

export default ThanksContent;
