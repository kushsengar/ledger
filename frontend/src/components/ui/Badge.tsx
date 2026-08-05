import React from 'react';
import { LoanStatus } from '../../types';

export const Badge = ({ status, children }: { status: LoanStatus | string, children?: React.ReactNode }) => {
  let statusClass = 'badge-draft';
  if (status === 'SUBMITTED') statusClass = 'badge-submitted';
  else if (status === 'UNDER_REVIEW') statusClass = 'badge-under-review';
  else if (status === 'APPROVED') statusClass = 'badge-approved';
  else if (status === 'REJECTED') statusClass = 'badge-rejected';
  else if (status === 'ESCALATED') statusClass = 'badge-escalated';

  const text = status.replace(/_/g, ' ');

  return (
    <span className={`badge ${statusClass}`}>
      {children || text}
    </span>
  );
};
