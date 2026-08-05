package com.ledger.audit.service;

import com.ledger.audit.entity.AuditLog;
import com.ledger.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {
    private final AuditLogRepository repository;

    public void logAction(String entityType, Long entityId, String action, String actorUsername, String details, String ipAddress) {
        AuditLog log = new AuditLog();
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setAction(action);
        log.setActorUsername(actorUsername);
        log.setDetails(details);
        log.setIpAddress(ipAddress);
        log.setTimestamp(LocalDateTime.now());
        repository.save(log);
    }

    public List<AuditLog> getAuditTrail(String entityType, Long entityId) {
        return repository.findByEntityTypeAndEntityIdOrderByTimestampDesc(entityType, entityId);
    }
}
