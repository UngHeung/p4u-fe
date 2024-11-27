import ThanksBox, { ThanksBoxProps } from './ThanksBox';
import styles from './styles/thanks.module.css';

const ThanksBoxList = () => {
  const thanksBoxes: ThanksBoxProps[] = [
    {
      content: '오늘도 하루를 허락해주셔서 감사해요.',
      reactions: [{ type: 'smile', count: 1 }],
    },
    {
      content: '오늘도 하루를 허락해주셔서 감사해요.',
      reactions: [
        { type: 'clap', count: 12 },
        { type: 'heart', count: 6 },
        { type: 'thumbsup', count: 3 },
      ],
    },
    {
      content: '오늘도 하루를 허락해주셔서 감사해요.',
      reactions: [{ type: 'heart', count: 5 }],
    },
  ];

  return (
    <ul className={styles.thanksBoxList}>
      {thanksBoxes.map((thanksBox, index) => (
        <li key={index}>
          <ThanksBox {...thanksBox} />
        </li>
      ))}
    </ul>
  );
};

export default ThanksBoxList;
