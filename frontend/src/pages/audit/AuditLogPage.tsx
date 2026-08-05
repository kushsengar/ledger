import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../api/axiosClient';
import { format } from 'date-fns';
import { Spinner } from '../../components/ui/Spinner';

export const AuditLogPage = () => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/audit/all');
      return data;
    },
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Audit Log</h1>
        <div className="page-subtitle">System-wide activity tracking</div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div className="flex items-center justify-center p-lg" style={{ padding: 40 }}><Spinner /></div>
        ) : logs && logs.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Entity Type</th>
                <th>Entity ID</th>
                <th>Action</th>
                <th>Actor</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any) => (
                <tr key={log.id}>
                  <td className="text-sm">{format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}</td>
                  <td>{log.entityType}</td>
                  <td>{log.entityId}</td>
                  <td><span className="badge badge-submitted">{log.action}</span></td>
                  <td>{log.actorUsername}</td>
                  <td className="text-sm text-muted max-w-xs truncate" title={log.details}>{log.details?.substring(0, 50)}{log.details?.length > 50 ? '...' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-muted" style={{ padding: 40 }}>No audit logs found.</div>
        )}
      </div>
    </div>
  );
};
