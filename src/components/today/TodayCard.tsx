import Card, { CardProps } from '../card/Card';

const TodayCard = ({ card }: { card: CardProps }) => {
  return <>{card && <Card {...card} />}</>;
};

export default TodayCard;
