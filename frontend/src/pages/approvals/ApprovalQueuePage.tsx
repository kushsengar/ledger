import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';

export const ApprovalQueuePage = () => {
  const navigate = useNavigate();
  const { data: queue, isLoading } = useQuery({
    queryKey: ['myQueue'],
    queryFn: loanApi.getMyQueue,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;

  const submitted = queue?.filter(l => l.status === 'SUBMITTED') || [];
  const underReview = queue?.filter(l => l.status === 'UNDER_REVIEW') || [];
  const escalated = queue?.filter(l => l.status === 'ESCALATED') || [];

  const KanbanCard = ({ loan }: { loan: any }) => (
    <div className="kanban-card" onClick={() => navigate(`/loans/${loan.id}`)}>
      <div className="flex-between mb-sm">
        <span className="text-xs font-semibold text-muted">{loan.applicationNumber}</span>
        {loan.riskScore && <span className="text-xs font-bold" style={{ color: loan.riskScore > 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>Score: {loan.riskScore}</span>}
      </div>
      <div className="font-semibold mb-sm">{loan.applicant.firstName} {loan.applicant.lastName}</div>
      <div className="flex-between mt-md">
        <span className="badge badge-draft">{loan.loanType}</span>
        <span className="amount text-sm">₹{loan.requestedAmount.toLocaleString()}</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Approval Queue</h1>
        <div className="page-subtitle">Loans requiring your attention</div>
      </div>

      <div className="kanban-board">
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Submitted ({submitted.length})</span>
          </div>
          {submitted.map(loan => <KanbanCard key={loan.id} loan={loan} />)}
        </div>
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Under Review ({underReview.length})</span>
          </div>
          {underReview.map(loan => <KanbanCard key={loan.id} loan={loan} />)}
        </div>
        <div className="kanban-column">
          <div className="kanban-column-header">
            <span>Escalated ({escalated.length})</span>
          </div>
          {escalated.map(loan => <KanbanCard key={loan.id} loan={loan} />)}
        </div>
      </div>
    </div>
  );
};
