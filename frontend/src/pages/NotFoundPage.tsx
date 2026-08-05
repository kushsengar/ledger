import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-md text-center">
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-rose)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p className="text-muted">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard" className="btn btn-primary mt-md">Back to Dashboard</Link>
    </div>
  );
};
