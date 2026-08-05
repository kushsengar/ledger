import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-md text-center">
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-amber)' }}>403</h1>
      <h2>Access Denied</h2>
      <p className="text-muted">You do not have permission to view this page.</p>
      <Link to="/dashboard" className="btn btn-primary mt-md">Back to Dashboard</Link>
    </div>
  );
};
