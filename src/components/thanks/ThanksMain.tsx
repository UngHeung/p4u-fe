import styles from './styles/thanks.module.css';
import ThanksBoxList from './ThanksBoxList';
import ThanksWriteForm from './ThanksWriteForm';

const ThanksMain = () => {
  return (
    <section className={styles.thanksMain}>
      <section className={styles.listContainer}>
        <ThanksBoxList />
      </section>
      <section className={styles.writeFormContainer}>
        <ThanksWriteForm />
      </section>
    </section>
  );
};

export default ThanksMain;
