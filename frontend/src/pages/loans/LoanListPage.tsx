import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loanApi } from '../../api/loanApi';
import { useAuth } from '../../hooks/useAuth';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { format } from 'date-fns';

const TABS = ['All', 'Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Escalated'];

export const LoanListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasRole } = useAuth();
  
  const statusToTab: Record<string, string> = {
    'DRAFT': 'Draft',
    'SUBMITTED': 'Submitted',
    'UNDER_REVIEW': 'Under Review',
    'APPROVED': 'Approved',
    'REJECTED': 'Rejected',
    'ESCALATED': 'Escalated'
  };
  
  const initialStatus = searchParams.get('status');
  const [activeTab, setActiveTab] = useState(initialStatus && statusToTab[initialStatus] ? statusToTab[initialStatus] : 'All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Sync tab if URL changes externally
  useEffect(() => {
    const status = searchParams.get('status');
    if (status && statusToTab[status]) {
      setActiveTab(statusToTab[status]);
    } else if (!status) {
      setActiveTab('All');
    }
  }, [searchParams]);

  const statusMap: Record<string, string> = {
    'All': '',
    'Draft': 'DRAFT',
    'Submitted': 'SUBMITTED',
    'Under Review': 'UNDER_REVIEW',
    'Approved': 'APPROVED',
    'Rejected': 'REJECTED',
    'Escalated': 'ESCALATED'
  };

  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans', activeTab],
    queryFn: () => loanApi.getLoans(statusMap[activeTab] || undefined),
  });

  const filteredLoans = loans?.filter(l => 
    l.applicationNumber.toLowerCase().includes(search.toLowerCase()) || 
    `${l.applicant.firstName} ${l.applicant.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Loan Applications</h1>
          <div className="page-subtitle">Manage and track all loan requests</div>
        </div>
        <input 
          type="text" 
          placeholder="Search loans..." 
          className="form-input" 
          style={{ width: 250 }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-tabs">
        {TABS.map(tab => (
          <button 
            key={tab} 
            className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'All') {
                searchParams.delete('status');
              } else {
                searchParams.set('status', statusMap[tab]);
              }
              setSearchParams(searchParams);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div className="flex items-center justify-center p-lg" style={{ padding: 40 }}><Spinner /></div>
        ) : filteredLoans && filteredLoans.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>App #</th>
                <th>Applicant</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                {hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER', 'ADMIN') && <th>Risk Score</th>}
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map(loan => (
                <tr key={loan.id} className="table-row-clickable" onClick={() => navigate(`/loans/${loan.id}`)}>
                  <td>{loan.applicationNumber}</td>
                  <td>{loan.applicant.firstName} {loan.applicant.lastName}</td>
                  <td>{loan.loanType}</td>
                  <td className="amount">₹{loan.requestedAmount.toLocaleString()}</td>
                  <td><Badge status={loan.status} /></td>
                  {hasRole('LOAN_OFFICER', 'BRANCH_MANAGER', 'CREDIT_RISK_OFFICER', 'ADMIN') && (
                    <td>{loan.riskScore ? <span className={loan.riskScore > 70 ? 'text-emerald' : 'text-amber'}>{loan.riskScore}</span> : '-'}</td>
                  )}
                  <td>{format(new Date(loan.createdAt), 'MMM dd, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-muted" style={{ padding: 40 }}>No loans found.</div>
        )}
      </div>
    </div>
  );
};
