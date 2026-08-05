import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { useAuth } from '../../hooks/useAuth';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Spinner } from '../../components/ui/Spinner';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const LoanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasRole, user } = useAuth();
  const queryClient = useQueryClient();
  
  const [modalType, setModalType] = useState<'APPROVE' | 'REJECT' | 'ESCALATE' | null>(null);
  const [comments, setComments] = useState('');

  const { data: loan, isLoading } = useQuery({
    queryKey: ['loan', id],
    queryFn: () => loanApi.getLoanById(Number(id)),
    enabled: !!id,
  });

  const actionMutation = useMutation({
    mutationFn: async ({ action, comments }: { action: string, comments?: string }) => {
      const loanId = Number(id);
      if (action === 'submit') return loanApi.submitLoan(loanId);
      if (action === 'review') return loanApi.startReview(loanId);
      if (action === 'approve') return loanApi.approveLoan(loanId, comments || '');
      if (action === 'reject') return loanApi.rejectLoan(loanId, comments || '');
      if (action === 'escalate') return loanApi.escalateLoan(loanId, comments || '');
      throw new Error('Unknown action');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loan', id] });
      toast.success('Action successful');
      setModalType(null);
      setComments('');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Spinner size={40} /></div>;
  if (!loan) return <div className="p-lg">Loan not found</div>;

  const handleAction = (action: string) => {
    if (['approve', 'reject', 'escalate'].includes(action)) {
      setModalType(action.toUpperCase() as any);
    } else {
      actionMutation.mutate({ action });
    }
  };

  const submitModalAction = () => {
    actionMutation.mutate({ action: modalType?.toLowerCase() || '', comments });
  };

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <div className="flex items-center gap-md">
            <h1 className="page-title">{loan.applicationNumber}</h1>
            <Badge status={loan.status} />
          </div>
          <div className="page-subtitle">Submitted on {format(new Date(loan.createdAt), 'MMMM dd, yyyy')}</div>
        </div>
        <div className="flex gap-sm">
          {loan.status === 'DRAFT' && hasRole('APPLICANT', 'LOAN_OFFICER') && (
            <button className="btn btn-primary" onClick={() => handleAction('submit')}>Submit for Review</button>
          )}
          {loan.status === 'SUBMITTED' && hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
            <button className="btn btn-primary" onClick={() => handleAction('review')}>Start Review</button>
          )}
          {loan.status === 'UNDER_REVIEW' && hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
            <>
              <button className="btn btn-danger" onClick={() => handleAction('reject')}>Reject</button>
              <button className="btn btn-secondary" onClick={() => handleAction('escalate')}>Escalate</button>
              <button className="btn btn-primary" onClick={() => handleAction('approve')}>Approve</button>
            </>
          )}
          {loan.status === 'ESCALATED' && hasRole('BRANCH_MANAGER', 'CREDIT_RISK_OFFICER') && (
            <>
              <button className="btn btn-danger" onClick={() => handleAction('reject')}>Reject</button>
              <button className="btn btn-primary" onClick={() => handleAction('approve')}>Approve</button>
            </>
          )}
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="flex flex-col gap-md">
          <div className="card">
            <div className="card-header"><h3>Applicant Info</h3></div>
            <div className="grid-2">
              <div><label className="text-muted text-sm">Name</label><div>{loan.applicant.firstName} {loan.applicant.lastName}</div></div>
              <div><label className="text-muted text-sm">Email</label><div>{loan.applicant.email}</div></div>
              <div><label className="text-muted text-sm">Phone</label><div>{loan.applicant.phone}</div></div>
              <div><label className="text-muted text-sm">PAN</label><div>{loan.applicant.panNumber}</div></div>
            </div>
            <div className="mt-md"><label className="text-muted text-sm">Address</label><div>{loan.applicant.address}</div></div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Loan Details</h3></div>
            <div className="grid-2">
              <div><label className="text-muted text-sm">Type</label><div>{loan.loanType}</div></div>
              <div><label className="text-muted text-sm">Amount</label><div className="amount">₹{loan.requestedAmount.toLocaleString()}</div></div>
              <div><label className="text-muted text-sm">Tenure</label><div>{loan.tenureMonths} Months</div></div>
              <div><label className="text-muted text-sm">Interest Rate</label><div>{loan.interestRate ? `${loan.interestRate}%` : 'TBD'}</div></div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header"><h3>Documents</h3></div>
            {loan.documents && loan.documents.length > 0 ? (
              <table className="table">
                <thead><tr><th>Type</th><th>File</th><th>Size</th><th>Status</th></tr></thead>
                <tbody>
                  {loan.documents.map(doc => (
                    <tr key={doc.id}>
                      <td>{doc.documentType.replace('_', ' ')}</td>
                      <td><a href={`/api/v1/documents/${doc.id}/download`} target="_blank" rel="noreferrer">{doc.fileName}</a></td>
                      <td>{(doc.fileSize / 1024).toFixed(1)} KB</td>
                      <td><Badge status={doc.verificationStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No documents uploaded.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-md">
          <div className="card">
            <div className="card-header"><h3>Risk Assessment</h3></div>
            {loan.riskScore ? (
              <>
                <div className="text-center mb-md">
                  <div className={`amount ${loan.riskScore > 70 ? 'text-emerald' : 'text-amber'}`} style={{ fontSize: '3rem' }}>
                    {loan.riskScore}
                  </div>
                  <div className="text-sm text-muted">Risk Score</div>
                </div>
                <div><label className="text-muted text-sm">Category</label><div>{loan.riskCategory}</div></div>
              </>
            ) : (
              <p className="text-muted">Not assessed yet.</p>
            )}
          </div>

          <div className="card">
            <div className="card-header"><h3>Approval Timeline</h3></div>
            <div className="timeline">
              {loan.approvalSteps && loan.approvalSteps.map(step => (
                <div key={step.id} className="timeline-item">
                  <div className={`timeline-dot ${step.action.toLowerCase()}`} />
                  <div className="text-sm font-semibold">{step.action.replace('_', ' ')}</div>
                  <div className="text-xs text-muted">{format(new Date(step.actionTimestamp), 'MMM dd, h:mm a')} by {step.actorUsername}</div>
                  {step.comments && <div className="text-sm mt-sm" style={{ background: 'var(--bg-tertiary)', padding: 8, borderRadius: 6 }}>{step.comments}</div>}
                </div>
              ))}
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="text-sm font-semibold">Application Created</div>
                <div className="text-xs text-muted">{format(new Date(loan.createdAt), 'MMM dd, h:mm a')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)} title={`${modalType} Loan`}>
        <div className="form-group">
          <label className="form-label">Comments (Required for Reject/Escalate)</label>
          <textarea 
            className="form-input" 
            rows={4} 
            value={comments} 
            onChange={e => setComments(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={() => setModalType(null)}>Cancel</button>
          <button 
            className={`btn ${modalType === 'REJECT' ? 'btn-danger' : 'btn-primary'}`} 
            onClick={submitModalAction}
            disabled={actionMutation.isPending || ((modalType === 'REJECT' || modalType === 'ESCALATE') && !comments)}
          >
            {actionMutation.isPending ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
