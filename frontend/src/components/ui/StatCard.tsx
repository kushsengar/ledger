import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ icon, label, value, trend, color = 'var(--accent-emerald)' }: { icon: ReactNode, label: string, value: string | number, trend?: number, color?: string }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}20`, color: color }}>
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend !== undefined && (
          <div className={`stat-trend ${trend >= 0 ? 'trend-up' : 'trend-down'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}% from last month
          </div>
        )}
      </div>
    </div>
  );
};
