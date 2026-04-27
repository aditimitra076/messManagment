import "./StatCard.css";

interface Props {
  title: string;
  value: string;
  change: string;
}

const StatCard = ({ title, value, change }: Props) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
      <span>{change}</span>
    </div>
  );
};

export default StatCard;