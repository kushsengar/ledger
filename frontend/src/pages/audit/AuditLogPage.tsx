import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../api/auditApi';
import { format } from 'date-fns';
import { Spinner } from '../../components/ui/Spinner';

export const AuditLogPage = () => {
  const [search, setSearch] = useState('');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: auditApi.getAllAuditLogs,
  });

  const filteredLogs = logs?.filter(log => 
    log.entityType.toLowerCase().includes(search.toLowerCase()) || 
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.actorUsername.toLowerCase().includes(search.toLowerCase()) ||
    (log.details && log.details.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Global Audit Logs</h1>
          <div className="page-subtitle">Track all system activities and changes</div>
        </div>
        <input 
          type="text" 
          placeholder="Search logs..." 
          className="form-input" 
          style={{ width: 300 }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <div className="flex items-center justify-center p-lg" style={{ padding: 40 }}><Spinner /></div>
        ) : filteredLogs && filteredLogs.length > 0 ? (
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
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td className="text-sm" style={{ whiteSpace: 'nowrap' }}>{format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm')}</td>
                  <td>{log.entityType}</td>
                  <td>{log.entityId}</td>
                  <td><span className="badge badge-submitted">{log.action}</span></td>
                  <td><span className="font-semibold">{log.actorUsername}</span></td>
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
