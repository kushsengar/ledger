import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { StatCard } from '../../components/ui/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { FileText, Clock, CheckCircle, XCircle, TrendingUp, Timer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockTrendData = [
  { name: 'Jan', approvals: 4000, rejections: 2400 },
  { name: 'Feb', approvals: 3000, rejections: 1398 },
  { name: 'Mar', approvals: 2000, rejections: 9800 },
  { name: 'Apr', approvals: 2780, rejections: 3908 },
  { name: 'May', approvals: 1890, rejections: 4800 },
  { name: 'Jun', approvals: 2390, rejections: 3800 },
  { name: 'Jul', approvals: 3490, rejections: 4300 },
];

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#f43f5e', '#8b5cf6'];

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: loanApi.getDashboardStats,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;

  const pieData = stats ? [
    { name: 'Approved', value: stats.approvedLoans },
    { name: 'Pending', value: stats.pendingLoans },
    { name: 'Submitted', value: stats.totalLoans - stats.approvedLoans - stats.pendingLoans - stats.rejectedLoans - stats.escalatedLoans },
    { name: 'Rejected', value: stats.rejectedLoans },
    { name: 'Escalated', value: stats.escalatedLoans },
  ].filter(d => d.value > 0) : [];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="page-subtitle">Overview of loan applications and processing</div>
      </div>

      {stats && (
        <div className="dashboard-grid">
          <div className="stats-grid">
            <div onClick={() => navigate('/loans')} style={{ cursor: 'pointer' }}>
              <StatCard icon={<FileText />} label="Total Loans" value={stats.totalLoans} color="var(--accent-blue)" />
            </div>
            <div onClick={() => navigate('/loans?status=SUBMITTED')} style={{ cursor: 'pointer' }}>
              <StatCard icon={<Clock />} label="Pending" value={stats.pendingLoans} color="var(--accent-amber)" />
            </div>
            <div onClick={() => navigate('/loans?status=APPROVED')} style={{ cursor: 'pointer' }}>
              <StatCard icon={<CheckCircle />} label="Approved" value={stats.approvedLoans} color="var(--accent-emerald)" />
            </div>
            <div onClick={() => navigate('/loans?status=REJECTED')} style={{ cursor: 'pointer' }}>
              <StatCard icon={<XCircle />} label="Rejected" value={stats.rejectedLoans} color="var(--accent-rose)" />
            </div>
            <StatCard icon={<TrendingUp />} label="Approval Rate" value={`${stats.approvalRate.toFixed(1)}%`} color="var(--accent-emerald)" trend={2.5} />
            <StatCard icon={<Timer />} label="Avg Processing" value={`${stats.avgProcessingDays} days`} color="var(--text-secondary)" />
          </div>

          <div className="charts-grid">
            <div className="card">
              <div className="card-header">
                <h3>Application Trends</h3>
              </div>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTrendData}>
                    <defs>
                      <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-emerald)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--accent-emerald)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRej" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-rose)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--accent-rose)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
                    <Area type="monotone" dataKey="approvals" stroke="var(--accent-emerald)" fillOpacity={1} fill="url(#colorApp)" />
                    <Area type="monotone" dataKey="rejections" stroke="var(--accent-rose)" fillOpacity={1} fill="url(#colorRej)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h3>Loans by Status</h3>
              </div>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
