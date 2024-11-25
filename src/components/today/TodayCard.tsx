import Card, { CardProps } from '../card/Card';

const TodayCard = ({ card }: { card: CardProps }) => {
  return <>{card && <Card card={card} />}</>;
};

export default TodayCard;
