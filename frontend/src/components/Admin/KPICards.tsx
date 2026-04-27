import React from 'react';
import './KPICards.css';

interface CardProps {
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'steady';
  icon: string;
}

const KPICard: React.FC<CardProps> = ({ label, value, trend, trendType, icon }) => (
  <div className="kpi-card">
    <div className="kpi-header">
      <span className="kpi-icon-box">{icon}</span>
      <span className={`kpi-trend ${trendType}`}>{trend}</span>
    </div>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
  </div>
);

const KPICards: React.FC = () => {
  const stats: CardProps[] = [
    { label: 'Active Mess Cards', value: '1,248', trend: '+12%', trendType: 'up', icon: '💳' },
    { label: 'Cards Closed Today', value: '14', trend: 'Steady', trendType: 'steady', icon: '🚫' },
    { label: 'Monthly Revenue', value: '$42,500', trend: '+8.4%', trendType: 'up', icon: '💰' },
    { label: 'Daily Cost/Student', value: '$4.85', trend: '+2%', trendType: 'up', icon: '👤' },
    { label: 'Food Waste %', value: '18.2%', trend: '-3%', trendType: 'down', icon: '🗑️' },
  ];

  return (
    <div className="kpi-grid">
      {stats.map((stat, index) => (
        <KPICard key={index} {...stat} />
      ))}
    </div>
  );
};

export default KPICards;